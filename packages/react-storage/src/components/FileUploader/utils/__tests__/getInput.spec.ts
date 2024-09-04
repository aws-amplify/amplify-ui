import * as AuthModule from 'aws-amplify/auth';
import { UploadDataWithPathInput, UploadDataInput } from 'aws-amplify/storage';
import { getInput, GetInputParams } from '../getInput';

const identityId = 'identity-id';
const fetchAuthSpy = jest
  .spyOn(AuthModule, 'fetchAuthSession')
  .mockResolvedValue({ identityId });

const file = new File(['hello'], 'hello.png', { type: 'image/png' });
const key = file.name;
const onProgress = jest.fn();
const accessLevel = 'guest';

const processFilePrefix = 'my-prefix/';
const processFile: GetInputParams['processFile'] = ({ key, ...rest }) => ({
  key: `${processFilePrefix}${key}`,
  ...rest,
});

const stringPath = 'my-path/';

const onProcessFileSuccess = jest.fn();
const inputBase: Omit<GetInputParams, 'path' | 'accessLevel'> = {
  file,
  key,
  onProgress,
  processFile: undefined,
  onProcessFileSuccess,
};
const pathStringInput: GetInputParams = {
  ...inputBase,
  accessLevel: undefined,
  path: stringPath,
};
const pathCallbackInput: GetInputParams = {
  ...inputBase,
  accessLevel: undefined,
  path: ({ identityId }) => `${stringPath}${identityId}`,
};

const accessLevelWithoutPathInput: GetInputParams = {
  ...inputBase,
  accessLevel,
  path: undefined,
};

const accessLevelWithPathInput: GetInputParams = {
  ...inputBase,
  accessLevel,
  file,
  key,
  path: stringPath,
};

describe('getInput', () => {
  beforeEach(() => {
    onProcessFileSuccess.mockClear();
    fetchAuthSpy.mockClear();
  });

  it('resolves an UploadDataWithPathInput with a string `path` as expected', async () => {
    const expected: UploadDataWithPathInput = {
      data: file,
      options: {
        contentType: file.type,
        useAccelerateEndpoint: undefined,
        onProgress,
      },
      path: `${stringPath}${key}`,
    };

    const input = getInput(pathStringInput);

    const output = await input();

    expect(output).toStrictEqual(expected);
  });

  it('resolves an UploadDataWithPathInput with a callback `path` as expected', async () => {
    const expected: UploadDataWithPathInput = {
      data: file,
      options: {
        contentType: file.type,
        useAccelerateEndpoint: undefined,
        onProgress,
      },
      path: `${stringPath}${identityId}${key}`,
    };

    const input = getInput(pathCallbackInput);

    const output = await input();

    expect(output).toStrictEqual(expected);
  });

  it('resolves an UploadDataInput without a `path` as expected', async () => {
    const expected: UploadDataInput = {
      data: file,
      options: {
        accessLevel,
        contentType: file.type,
        useAccelerateEndpoint: undefined,
        onProgress,
      },
      key,
    };

    const input = getInput(accessLevelWithoutPathInput);

    const output = await input();

    expect(output).toStrictEqual(expected);
  });

  it('resolves an UploadDataInput with a `path` as expected', async () => {
    const expected: UploadDataInput = {
      data: file,
      options: {
        accessLevel,
        contentType: file.type,
        useAccelerateEndpoint: undefined,
        onProgress,
      },
      key: `${stringPath}${key}`,
    };

    const input = getInput(accessLevelWithPathInput);

    const output = await input();

    expect(output).toStrictEqual(expected);
  });

  it('handles a `processFile` param expected', async () => {
    const expected: UploadDataWithPathInput = {
      data: file,
      options: {
        contentType: file.type,
        useAccelerateEndpoint: undefined,
        onProgress,
      },
      path: `${stringPath}${identityId}${processFilePrefix}${key}`,
    };

    const input = getInput({ ...pathCallbackInput, processFile });

    const output = await input();

    expect(output).toStrictEqual(expected);
  });

  it('calls `onProcessFileSuccess` when `processFile` is provided', async () => {
    const processedKey = `processedKey`;

    const input = getInput({
      ...pathStringInput,
      processFile: ({ key: _, ...rest }) => ({
        key: processedKey,
        ...rest,
      }),
    });

    await input();

    expect(onProcessFileSuccess).toHaveBeenCalledTimes(1);
    expect(onProcessFileSuccess).toHaveBeenCalledWith({
      processedKey,
    });
  });

  it('does not call `onProcessFileSuccess` when `processFile` is not provided', async () => {
    const input = getInput(pathStringInput);

    await input();

    expect(onProcessFileSuccess).not.toHaveBeenCalled();
  });

  it('includes additional values returned from `processFile` in `options`', async () => {
    const contentDisposition = 'attachment';
    const metadata = { key };

    const expected: UploadDataWithPathInput = {
      data: file,
      options: {
        contentDisposition,
        contentType: file.type,
        metadata,
        onProgress,
        useAccelerateEndpoint: undefined,
      },
      path: `${stringPath}${processFilePrefix}${key}`,
    };

    const input = getInput({
      ...pathStringInput,
      processFile: ({ key, ...rest }) => ({
        key: `${processFilePrefix}${key}`,
        metadata,
        contentDisposition,
        ...rest,
      }),
    });

    const output = await input();

    expect(output).toStrictEqual(expected);
    expect(output.options?.metadata).toStrictEqual(metadata);
    expect(output.options?.contentDisposition).toStrictEqual(
      contentDisposition
    );
  });

  it('calls `onProcessFileSuccess` after fetchAuthSession', async () => {
    const processedKey = `processedKey`;

    const input = getInput({
      ...pathCallbackInput,
      processFile: ({ key: _, ...rest }) => ({
        key: processedKey,
        ...rest,
      }),
    });

    await input();

    const fetchAuthSessionCallOrder = fetchAuthSpy.mock.invocationCallOrder[0];
    const onProcessFileSuccessCallORder =
      onProcessFileSuccess.mock.invocationCallOrder[0];
    expect(fetchAuthSessionCallOrder).toBeLessThan(
      onProcessFileSuccessCallORder
    );

    expect(fetchAuthSpy).toHaveBeenCalledTimes(1);
    expect(onProcessFileSuccess).toHaveBeenCalledTimes(1);
    expect(onProcessFileSuccess).toHaveBeenCalledWith({
      processedKey,
    });
  });

  it('defaults `options.contentType` to "binary/octet-stream" when no file type is provided', async () => {
    const data = new File(['hello'], 'hello.png');
    const expected: UploadDataWithPathInput = {
      data,
      options: {
        contentType: 'binary/octet-stream',
        useAccelerateEndpoint: undefined,
        onProgress,
      },
      path: `${stringPath}${key}`,
    };

    const input = getInput({ ...pathStringInput, file: data });

    const output = await input();

    expect(output).toStrictEqual(expected);
  });

  it('accepts useAccelerateEndpoint', async () => {
    const data = new File(['hello'], 'hello.png');
    const expected: UploadDataWithPathInput = {
      data,
      options: {
        contentType: 'binary/octet-stream',
        useAccelerateEndpoint: true,
        onProgress,
      },
      path: `${stringPath}${key}`,
    };

    const input = getInput({
      ...pathStringInput,
      file: data,
      useAccelerateEndpoint: true,
    });

    const output = await input();

    expect(output).toStrictEqual(expected);
  });
});
