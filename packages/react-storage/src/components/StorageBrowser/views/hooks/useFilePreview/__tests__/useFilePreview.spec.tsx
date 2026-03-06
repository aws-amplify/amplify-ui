/* eslint-disable @typescript-eslint/require-await */

import { act, renderHook, waitFor } from '@testing-library/react';
import * as Storage from 'aws-amplify/storage';
import { useFilePreview } from '../useFilePreview';
import type { FileData } from '../../../../actions';
import { createConfigurationProvider } from '../../../../configuration';
import { getUrl } from '../../../../storage-internal';
import { safeGetProperties } from '../../../utils/files/safeGetProperties';
import { constructBucket } from '../../../../actions/handlers';
import { useStore } from '../../../../store';
import {
  FailFilePreviewContent,
  FilePreviewContent,
  OKFilePreviewContent,
} from '../types';

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
    const { result } = renderHook(
      () => useFilePreview({ activeFile: undefined }),
      {
        wrapper: Provider,
      }
    );

    expect(result.current.enabled).toEqual(false);
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

    const { result } = renderHook(
      () => useFilePreview({ activeFile: mockFileData }),
      {
        wrapper: Provider,
      }
    );

    const { enabled, ...state } = result.current;
    expect(enabled).toEqual(true);
    const content = state as FilePreviewContent;
    expect(content.isLoading).toBe(true);
    waitFor(() => {
      expect(content.isLoading).toBe(false);
      const okContent = content as OKFilePreviewContent;
      expect(okContent.ok).toBe(true);
      expect(okContent.url).toBe('https://example.com/test.jpg');
      expect(okContent.fileData).toEqual(mockFileData);
    });
  });

  it('handles file size limit exceeded', async () => {
    mockGetProperties.mockResolvedValue({
      key: 'test.jpg',
      contentType: 'image/jpeg',
      size: 2000000,
      lastModified: new Date(),
    });

    const { result } = renderHook(
      () => useFilePreview({ activeFile: mockFileData }),
      {
        wrapper: Provider,
      }
    );

    const { enabled, ...state } = result.current;
    expect(enabled).toEqual(true);
    const content = state as FilePreviewContent;
    expect(content.isLoading).toBe(true);
    waitFor(() => {
      expect(content.isLoading).toBe(false);
      const failContent = content as FailFilePreviewContent;
      expect(failContent.ok).toBe(false);
      expect(failContent.error).toBe('LIMIT_EXCEEDED');
    });
  });

  it('handles errors during preparation', async () => {
    mockGetUrl.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(
      () => useFilePreview({ activeFile: mockFileData }),
      {
        wrapper: Provider,
      }
    );

    const { enabled, ...state } = result.current;
    expect(enabled).toEqual(true);
    const content = state as FilePreviewContent;
    expect(content.isLoading).toBe(true);
    waitFor(() => {
      expect(content.isLoading).toBe(false);
      const failContent = content as FailFilePreviewContent;
      expect(failContent.ok).toBe(false);
      expect(failContent.error).toBe('GENERIC_ERROR');
    });
  });

  it('does not open file when key is missing', async () => {
    const { result } = renderHook(
      () => useFilePreview({ activeFile: { ...mockFileData, key: '' } }),
      {
        wrapper: Provider,
      }
    );

    expect(mockGetProperties).not.toHaveBeenCalled();
    expect(result.current.enabled).toEqual(false);
  });

  it('prevents opening the same file twice', () => {
    const { result, rerender } = renderHook(
      () => useFilePreview({ activeFile: mockFileData }),
      {
        wrapper: Provider,
      }
    );

    const { enabled, ...state } = result.current;
    const content = state as OKFilePreviewContent;
    waitFor(() => {
      expect(content.fileData).toEqual(mockFileData);
    });

    act(() => {
      rerender({ activeFile: { ...mockFileData } });
    });
    const { enabled: newEnabled, ...newState } = result.current;
    const newContent = newState as OKFilePreviewContent;
    expect(newContent.fileData).toBe(content.fileData);
    expect(mockSafeGetProperties).toHaveBeenCalledTimes(1);
  });

  it('allows opening different file after one is already open', () => {
    const { result, rerender } = renderHook(
      () => useFilePreview({ activeFile: mockFileData }),
      {
        wrapper: Provider,
      }
    );
    const differentFile: FileData = {
      ...mockFileData,
      key: 'different.jpg',
      id: 'different-id',
    };

    const { enabled, ...state } = result.current;
    expect(enabled).toEqual(true);
    const content = state as OKFilePreviewContent;
    waitFor(() => {
      expect(content.fileData).toEqual(mockFileData);
    });

    act(() => {
      rerender({ activeFile: differentFile });
    });

    const { enabled: newEnabled, ...newState } = result.current;
    expect(newEnabled).toEqual(true);
    const newContent = newState as OKFilePreviewContent;
    waitFor(() => {
      expect(newContent.fileData).toEqual(differentFile);
      expect(mockSafeGetProperties).toHaveBeenCalledTimes(2);
    });
  });
});
