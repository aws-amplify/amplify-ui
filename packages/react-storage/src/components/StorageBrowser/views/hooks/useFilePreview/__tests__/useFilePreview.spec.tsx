/* eslint-disable @typescript-eslint/require-await */

import { renderHook, act } from '@testing-library/react';
import * as Storage from 'aws-amplify/storage';
import { useFilePreview } from '../useFilePreview';
import type { FileData } from '../../../../actions';
import { createConfigurationProvider } from '../../../../configuration';
import { getUrl } from '../../../../storage-internal';
import { safeGetProperties } from '../../../utils/files/safeGetProperties';
import { constructBucket } from '../../../../actions/handlers';
import { useStore } from '../../../../store';

jest.mock('aws-amplify/storage');
jest.mock('../../../../store');
jest.mock('../../../../storage-internal');
jest.mock('../../../utils/files/safeGetProperties');
jest.mock('../../../../actions/handlers');

jest.mock('../../../../filePreview/context', () => ({
  useFilePreviewContext: () => ({
    fileTypeResolver: undefined,
    urlOptions: undefined,
    maxFileSize: 1000000,
  }),
}));

const mockGetProperties = Storage.getProperties as jest.MockedFunction<
  typeof Storage.getProperties
>;
const mockGetUrl = getUrl as jest.MockedFunction<typeof getUrl>;
const mockSafeGetProperties = safeGetProperties as jest.MockedFunction<
  typeof safeGetProperties
>;
const mockConstructBucket = constructBucket as jest.MockedFunction<
  typeof constructBucket
>;

describe('useFilePreview', () => {
  const mockUseStore = jest.mocked(useStore);

  const mockStoreDispatch = jest.fn();

  const mockFileData: FileData = {
    key: 'test.jpg',
    size: 1024,
    type: 'FILE',
    id: 'test-id',
    lastModified: new Date(),
  };

  const Provider = createConfigurationProvider({
    displayName: 'MyProvider',
    getLocationCredentials: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        accessKeyId: 'test-access-key',
        secretAccessKey: 'test-secret-key',
        sessionToken: 'test-session-token',
      });
    }),
    accountId: '012345678901',
    customEndpoint: 'mock-endpoint',
    region: 'my-region',
    registerAuthListener: jest.fn(),
  });

  const mockUrlResponse = {
    url: new URL('https://example.com/test.jpg'),
    expiresAt: new Date(Date.now() + 3600000),
  };

  const mockPropertiesResponse = {
    key: 'test.jpg',
    contentType: 'image/jpeg',
    size: 1024,
    lastModified: new Date(),
  };

  beforeEach(() => {
    mockGetProperties.mockClear();
    mockGetUrl.mockClear();
    mockSafeGetProperties.mockClear();
    mockConstructBucket.mockClear();

    mockConstructBucket.mockReturnValue({
      bucketName: 'test-bucket',
      region: 'us-east-1',
    });
    mockSafeGetProperties.mockResolvedValue(mockPropertiesResponse);
    mockGetUrl.mockResolvedValue(mockUrlResponse);

    mockUseStore.mockReturnValue([
      {
        actionType: 'DOWNLOAD',
        location: {
          current: {
            prefix: 'test-prefix/',
            bucket: 'bucket',
            id: 'id',
            permissions: ['get'],
            type: 'PREFIX',
          },
          path: '',
          key: 'test-prefix/',
        },
      },
      mockStoreDispatch,
    ]);
  });
  it('initializes with correct initial state', () => {
    const { result } = renderHook(() => useFilePreview(), {
      wrapper: Provider,
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.previewedFile).toBe(null);
    expect(result.current.url).toBe(null);
    expect(result.current.hasLimitExceeded).toBe(false);
  });

  it('opens file for preview successfully', async () => {
    mockGetProperties.mockResolvedValue({
      key: 'test.jpg',
      contentType: 'image/jpeg',
      size: 1024,
      lastModified: new Date(),
    });
    mockGetUrl.mockResolvedValue({
      url: new URL('https://example.com/test.jpg'),
      expiresAt: new Date(),
    });

    const { result } = renderHook(() => useFilePreview(), {
      wrapper: Provider,
    });

    await act(async () => {
      result.current.onOpenFilePreview(mockFileData);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.previewedFile).toMatchObject({
      key: 'test.jpg',
    });
    expect(result.current.url).toBe('https://example.com/test.jpg');
  });

  it('handles file size limit exceeded', async () => {
    mockGetProperties.mockResolvedValue({
      key: 'test.jpg',
      contentType: 'image/jpeg',
      size: 2000000,
      lastModified: new Date(),
    });

    const { result } = renderHook(() => useFilePreview(), {
      wrapper: Provider,
    });

    await act(async () => {
      result.current.onOpenFilePreview({ ...mockFileData, size: 2000000 });
    });

    expect(result.current.hasLimitExceeded).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('handles errors during preparation', async () => {
    mockGetUrl.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useFilePreview(), {
      wrapper: Provider,
    });

    await act(async () => {
      result.current.onOpenFilePreview(mockFileData);
    });

    expect(result.current.hasError).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('closes preview state', async () => {
    const { result } = renderHook(() => useFilePreview(), {
      wrapper: Provider,
    });

    await act(async () => {
      result.current.onOpenFilePreview(mockFileData);
    });

    act(() => {
      result.current.onCloseFilePreview();
    });

    expect(result.current.previewedFile).toBe(null);
    expect(result.current.url).toBe(null);
    expect(result.current.hasError).toBe(false);
    expect(result.current.hasLimitExceeded).toBe(false);
  });

  it('does not open file when key is missing', async () => {
    const fileDataWithoutKey = { ...mockFileData, key: '' };
    const { result } = renderHook(() => useFilePreview(), {
      wrapper: Provider,
    });

    await act(async () => {
      result.current.onOpenFilePreview(fileDataWithoutKey);
    });

    expect(mockGetProperties).not.toHaveBeenCalled();
    expect(result.current.previewedFile).toBe(null);
  });

  it('prevents closing when no file is previewed', () => {
    const { result } = renderHook(() => useFilePreview(), {
      wrapper: Provider,
    });

    expect(result.current.previewedFile).toBe(null);

    act(() => {
      result.current.onCloseFilePreview();
    });

    expect(result.current.previewedFile).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
  });
});
