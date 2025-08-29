import { getProperties } from 'aws-amplify/storage';
import { safeGetProperties } from '../safeGetProperties';

jest.mock('aws-amplify/storage');

const mockGetProperties = getProperties as jest.MockedFunction<
  typeof getProperties
>;

describe('safeGetProperties', () => {
  beforeEach(() => {
    mockGetProperties.mockClear();
  });

  it('passes full input parameters to getProperties', async () => {
    const mockResult = {
      key: 'test.jpg',
      contentType: 'image/jpeg',
      size: 1024,
      lastModified: new Date(),
    };
    mockGetProperties.mockResolvedValue(mockResult);

    const input = {
      path: 'test.jpg',
      options: {
        bucket: 'test-bucket',
        expectedBucketOwner: 'test-account-id',
      },
    };

    const result = await safeGetProperties(input);

    expect(mockGetProperties).toHaveBeenCalledWith(input);
    expect(result).toBe(mockResult);
  });

  it('returns empty object on error', async () => {
    mockGetProperties.mockRejectedValue(new Error('Network error'));

    const input = {
      path: 'test.jpg',
      options: {
        bucket: 'test-bucket',
        expectedBucketOwner: 'test-account-id',
      },
    };

    const result = await safeGetProperties(input);

    expect(mockGetProperties).toHaveBeenCalledWith(input);
    expect(result).toEqual({});
  });

  it('handles minimal input parameters', async () => {
    const mockResult = {
      key: 'test.jpg',
      contentType: 'image/jpeg',
      size: 1024,
      lastModified: new Date(),
    };
    mockGetProperties.mockResolvedValue(mockResult);

    const input = { path: 'test.jpg' };

    const result = await safeGetProperties(input);

    expect(mockGetProperties).toHaveBeenCalledWith(input);
    expect(result).toBe(mockResult);
  });

  it('preserves all options in the call', async () => {
    const mockResult = {
      key: 'test.jpg',
      contentType: 'image/jpeg',
      size: 1024,
      lastModified: new Date(),
    };
    mockGetProperties.mockResolvedValue(mockResult);

    const input = {
      path: 'test.jpg',
      options: {
        bucket: 'test-bucket',
        expectedBucketOwner: 'test-account-id',
      },
    };

    const result = await safeGetProperties(input);

    expect(mockGetProperties).toHaveBeenCalledWith(input);
    expect(result).toBe(mockResult);
  });
});
