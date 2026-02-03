import { remove } from '../../../storage-internal';

import { deleteHandler, DeleteHandlerInput } from '../delete';

jest.mock('../../../storage-internal');

const baseInput: DeleteHandlerInput = {
  config: {
    accountId: 'accountId',
    bucket: 'bucket',
    credentials: jest.fn(),
    customEndpoint: 'mock-endpoint',
    region: 'region',
  },
  data: {
    id: 'id',
    key: 'prefix/file-name',
    fileKey: 'file-name',
  },
};

describe('deleteHandler', () => {
  const mockRemove = jest.mocked(remove);
  const mockCancel = jest.fn();

  beforeEach(() => {
    mockRemove.mockReturnValue({
      result: Promise.resolve({ path: 'prefix/file-name' }),
      cancel: mockCancel,
      then: jest.fn(),
      catch: jest.fn(),
      finally: jest.fn(),
      state: 'PENDING',
    });
  });

  afterEach(() => {
    mockRemove.mockReset();
    mockCancel.mockReset();
  });

  it('calls `remove` with the expected values', () => {
    deleteHandler(baseInput);

    expect(mockRemove).toHaveBeenCalledWith({
      path: baseInput.data.key,
      options: {
        bucket: {
          bucketName: baseInput.config.bucket,
          region: baseInput.config.region,
        },
        customEndpoint: baseInput.config.customEndpoint,
        locationCredentialsProvider: baseInput.config.credentials,
        expectedBucketOwner: baseInput.config.accountId,
        onProgress: expect.any(Function),
      },
    });
  });

  it('returns a complete status', async () => {
    const { result } = deleteHandler(baseInput);

    expect(await result).toEqual({
      status: 'COMPLETE',
      value: {
        key: 'prefix/file-name',
        successCount: 0,
        failureCount: 0,
      },
    });
  });

  it('returns failed status', async () => {
    const error = new Error('Delete failed!');
    mockRemove.mockReturnValue({
      result: Promise.reject(error),
      cancel: mockCancel,
      then: jest.fn(),
      catch: jest.fn(),
      finally: jest.fn(),
      state: 'PENDING',
    });

    const { result } = deleteHandler(baseInput);

    expect(await result).toEqual({
      error,
      message: error.message,
      status: 'FAILED',
    });
  });

  it('returns cancel function', () => {
    const { cancel } = deleteHandler(baseInput);

    expect(cancel).toBeDefined();
    cancel?.();
    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onProgress callback with progress data', () => {
    const mockOnProgress = jest.fn();
    const inputWithProgress = {
      ...baseInput,
      options: { onProgress: mockOnProgress },
    };

    mockRemove.mockImplementation((params) => {
      params.options?.onProgress?.({
        deleted: [{ path: 'file1' }, { path: 'file2' }],
        failed: [{ path: 'file3', code: 'ERROR', message: 'Failed' }],
      });

      return {
        result: Promise.resolve({ path: 'prefix/file-name' }),
        cancel: mockCancel,
        then: jest.fn(),
        catch: jest.fn(),
        finally: jest.fn(),
        state: 'PENDING',
      };
    });

    deleteHandler(inputWithProgress);

    expect(mockOnProgress).toHaveBeenCalledWith(baseInput.data, {
      successCount: 2,
      failureCount: 1,
    });
  });

  it('handles onProgress with undefined arrays', () => {
    const mockOnProgress = jest.fn();
    const inputWithProgress = {
      ...baseInput,
      options: { onProgress: mockOnProgress },
    };

    mockRemove.mockImplementation((params) => {
      params.options?.onProgress?.({
        deleted: undefined,
        failed: undefined,
      });

      return {
        result: Promise.resolve({ path: 'prefix/file-name' }),
        cancel: mockCancel,
        then: jest.fn(),
        catch: jest.fn(),
        finally: jest.fn(),
        state: 'PENDING',
      };
    });

    deleteHandler(inputWithProgress);

    expect(mockOnProgress).toHaveBeenCalledWith(baseInput.data, {
      successCount: 0,
      failureCount: 0,
    });
  });
});
