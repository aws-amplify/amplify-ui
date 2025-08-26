/* eslint-disable @typescript-eslint/require-await */

import { renderHook, act } from '@testing-library/react';
import * as Storage from 'aws-amplify/storage';
import { useFilePreview } from '../useFilePreview';
import type { FileData } from '../../../../actions';

jest.mock('aws-amplify/storage');
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
const mockGetUrl = Storage.getUrl as jest.MockedFunction<typeof Storage.getUrl>;

describe('useFilePreview', () => {
  const mockFileData: FileData = {
    key: 'test.jpg',
    size: 1024,
    type: 'FILE',
    id: 'test-id',
    lastModified: new Date(),
  };

  beforeEach(() => {
    mockGetProperties.mockClear();
    mockGetUrl.mockClear();
  });

  it('initializes with correct initial state', () => {
    const { result } = renderHook(() => useFilePreview());

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

    const { result } = renderHook(() => useFilePreview());

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

    const { result } = renderHook(() => useFilePreview());

    await act(async () => {
      result.current.onOpenFilePreview(mockFileData);
    });

    expect(result.current.hasLimitExceeded).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('handles errors during preparation', async () => {
    mockGetProperties.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useFilePreview());

    await act(async () => {
      result.current.onOpenFilePreview(mockFileData);
    });

    expect(result.current.hasError).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('closes preview state', async () => {
    const { result } = renderHook(() => useFilePreview());

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
    const { result } = renderHook(() => useFilePreview());

    await act(async () => {
      result.current.onOpenFilePreview(fileDataWithoutKey);
    });

    expect(mockGetProperties).not.toHaveBeenCalled();
    expect(result.current.previewedFile).toBe(null);
  });

  it('prevents opening the same file twice', () => {
    const { result } = renderHook(() => useFilePreview());

    act(() => {
      result.current.onOpenFilePreview(mockFileData);
    });

    expect(result.current.previewedFile).toBe(mockFileData);

    const initialState = result.current;
    act(() => {
      result.current.onOpenFilePreview(mockFileData);
    });

    expect(result.current.previewedFile).toBe(initialState.previewedFile);
    expect(mockGetProperties).toHaveBeenCalledTimes(1);
  });

  it('prevents closing when no file is previewed', () => {
    const { result } = renderHook(() => useFilePreview());

    expect(result.current.previewedFile).toBe(null);

    act(() => {
      result.current.onCloseFilePreview();
    });

    expect(result.current.previewedFile).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
  });

  it('allows opening different file after one is already open', () => {
    const { result } = renderHook(() => useFilePreview());
    const differentFile: FileData = {
      ...mockFileData,
      key: 'different.jpg',
      id: 'different-id',
    };

    // Open first file
    act(() => {
      result.current.onOpenFilePreview(mockFileData);
    });

    expect(result.current.previewedFile).toBe(mockFileData);

    // Open different file - should work
    act(() => {
      result.current.onOpenFilePreview(differentFile);
    });

    expect(result.current.previewedFile).toBe(differentFile);
    expect(mockGetProperties).toHaveBeenCalledTimes(2);
  });
});
