import { createLocationCredentialsStore } from '../../store/create';
import { createStore, getValue, removeStore } from '../../store/registry';
import { LocationCredentialsStore } from '../../types';
import {
  AWSTemporaryCredentials,
  StorageValidationErrorCode,
  validationErrorMap,
} from '../../../storage-internal';

jest.mock('../../store/registry');

const mockedCredentials = 'MOCK_CREDS' as any as AWSTemporaryCredentials;
const mockedGetValue = jest.mocked(getValue);

describe('createLocationCredentialsStore', () => {
  it('should create a store', () => {
    const refreshHandler = jest.fn();
    const store = createLocationCredentialsStore({ handler: refreshHandler });

    expect(createStore).toHaveBeenCalledWith(refreshHandler);
    expect(store.getProvider).toBeDefined();
    expect(store.destroy).toBeDefined();
  });

  describe('created store', () => {
    describe('getProvider()', () => {
      let store: LocationCredentialsStore;

      beforeEach(() => {
        store = createLocationCredentialsStore({ handler: jest.fn() });
      });

      afterEach(() => {
        jest.clearAllMocks();
        store.destroy();
      });

      it('should call getValue() from store', async () => {
        expect.assertions(2);
        mockedGetValue.mockResolvedValue({ credentials: mockedCredentials });

        const locationCredentialsProvider = store.getProvider({
          scope: 's3://bucket/path/*',
          permission: 'READ',
        });
        const { credentials } = await locationCredentialsProvider();
        expect(credentials).toEqual(mockedCredentials);
        expect(getValue).toHaveBeenCalledWith(
          expect.objectContaining({
            location: {
              scope: 's3://bucket/path/*',
              permission: 'READ',
            },
            forceRefresh: false,
          })
        );
      });

      it.each(['invalid-s3-uri', 's3://', 's3:///'])(
        'should throw if location credentials provider scope is not a valid S3 URI "%s"',
        async (invalidScope) => {
          mockedGetValue.mockResolvedValue({ credentials: mockedCredentials });
          const locationCredentialsProvider = store.getProvider({
            scope: invalidScope,
            permission: 'READWRITE',
          });

          await expect(() => locationCredentialsProvider()).rejects.toThrow(
            validationErrorMap[StorageValidationErrorCode.InvalidS3Uri].message
          );
        }
      );
    });

    describe('destroy()', () => {
      it('should call removeStore() from store', () => {
        const store = createLocationCredentialsStore({
          handler: jest.fn(),
        });
        store.destroy();
        expect(removeStore).toHaveBeenCalled();
      });
    });
  });
});
