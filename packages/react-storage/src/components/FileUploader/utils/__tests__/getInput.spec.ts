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

const inputBase: Omit<GetInputParams, 'path' | 'accessLevel'> = {
  file,
  key,
  onProgress,
  processFile: undefined,
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

  it('correctly parses values returned from `processFile`', async () => {
    const contentDisposition = 'attachment';
    const metadata = { key };
    const processedFile = new File([''], `myfile.txt`);

    const input = getInput({
      ...pathStringInput,
      processFile: ({ key, ...rest }) => ({
        ...rest,
        key: `${processFilePrefix}${key}`,
        file: processedFile,
        metadata,
        contentDisposition,
      }),
    });

    const output = await input();

    expect(output).toMatchObject({
      data: expect.any(File),
      options: {
        contentDisposition,
        contentType: file.type,
        metadata,
        onProgress: expect.any(Function),
        useAccelerateEndpoint: undefined,
      },
      path: `${stringPath}${processFilePrefix}${key}`,
    });
    expect(output.data).toBe(processedFile);
  });

  it('correctly parses values returned from `processFile` when in accessLevel mode', async () => {
    const contentDisposition = 'attachment';
    const metadata = { key };
    const processedFile = new File([], `myfile.txt`);

    const input = getInput({
      ...accessLevelWithoutPathInput,
      processFile: ({ key, ...rest }) => ({
        ...rest,
        key: `${processFilePrefix}${key}`,
        metadata,
        contentDisposition,
        file: processedFile,
      }),
    });

    const output = await input();

    expect(output).toMatchObject({
      data: expect.any(File),
      options: {
        accessLevel,
        contentDisposition,
        contentType: file.type,
        metadata,
        onProgress: expect.any(Function),
        useAccelerateEndpoint: undefined,
      },
    });

    expect(output.data).toBe(processedFile);
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
