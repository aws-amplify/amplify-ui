import React from 'react';
import { list } from '../../../../storage-internal';
import {
  countFilesInFolder,
  createDeleteConfirmationModalProps,
  getFolderName,
  createFolderListContent,
} from '../utils';

jest.mock('../../../../storage-internal');

jest.mock('../../../../actions/handlers', () => ({
  constructBucket: jest.fn().mockReturnValue('test-bucket'),
}));

const mockList = jest.mocked(list);

describe('getFolderName', () => {
  it('should extract folder name from path with trailing slash', () => {
    expect(getFolderName('path/to/folder/')).toBe('folder');
  });

  it('should extract folder name from path without trailing slash', () => {
    expect(getFolderName('path/to/folder')).toBe('folder');
  });

  it('should return original key if no path separators', () => {
    expect(getFolderName('folder')).toBe('folder');
  });

  it('should handle empty path', () => {
    expect(getFolderName('')).toBe('');
  });

  it('should handle root path', () => {
    expect(getFolderName('/')).toBe('');
  });
});

describe('createFolderListContent', () => {
  it('should create JSX content for folder list', () => {
    const folders = [
      {
        id: '1',
        key: 'folder1/',
        type: 'FOLDER' as const,
        size: 0,
        lastModified: new Date(),
      },
      {
        id: '2',
        key: 'path/folder2/',
        type: 'FOLDER' as const,
        size: 0,
        lastModified: new Date(),
      },
    ];

    const result = createFolderListContent(folders);

    expect(result).toBeDefined();
    expect(React.isValidElement(result)).toBe(true);
  });

  it('should handle empty folder list', () => {
    const result = createFolderListContent([]);
    expect(result).toBeDefined();
  });
});

describe('createDeleteConfirmationModalProps', () => {
  it('should create modal props with single folder', () => {
    const items = [
      {
        id: '1',
        key: 'folder/',
        type: 'FOLDER' as const,
        size: 0,
        lastModified: new Date(),
      },
    ];

    const result = createDeleteConfirmationModalProps(items, true);

    expect(result).toEqual({
      isOpen: true,
      title: 'Confirm Deletion',
      message: 'The items that will be deleted contain 1 folder',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      content: expect.any(Object),
    });
  });

  it('should create modal props with multiple folders', () => {
    const items = [
      {
        id: '1',
        key: 'folder1/',
        type: 'FOLDER' as const,
        size: 0,
        lastModified: new Date(),
      },
      {
        id: '2',
        key: 'folder2/',
        type: 'FOLDER' as const,
        size: 0,
        lastModified: new Date(),
      },
    ];

    const result = createDeleteConfirmationModalProps(items, true);

    expect(result.message).toBe(
      'The items that will be deleted contain 2 folders'
    );
  });

  it('should create modal props with no folders', () => {
    const items = [
      {
        id: '1',
        key: 'file.txt',
        type: 'FILE' as const,
        size: 100,
        lastModified: new Date(),
      },
    ];

    const result = createDeleteConfirmationModalProps(items, false);

    expect(result).toEqual({
      isOpen: false,
      title: 'Confirm Deletion',
      message: 'The items that will be deleted contain 0 folders',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      content: expect.any(Object),
    });
  });

  it('should create modal props with mixed items', () => {
    const items = [
      {
        id: '1',
        key: 'file.txt',
        type: 'FILE' as const,
        size: 100,
        lastModified: new Date(),
      },
      {
        id: '2',
        key: 'folder/',
        type: 'FOLDER' as const,
        size: 0,
        lastModified: new Date(),
      },
    ];

    const result = createDeleteConfirmationModalProps(items, true);

    expect(result.message).toBe(
      'The items that will be deleted contain 1 folder'
    );
  });
});

describe('countFilesInFolder', () => {
  const mockConfig = {
    bucket: 'test-bucket',
    credentials: jest.fn().mockResolvedValue({ credentials: {} }),
    region: 'us-east-1',
    accountId: 'test-account',
    customEndpoint: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should count files in folder', async () => {
    mockList.mockResolvedValue({
      items: [
        { path: 'folder/file1.txt' },
        { path: 'folder/file2.txt' },
        { path: 'folder/subfolder/' },
      ],
      nextToken: undefined,
    });

    const result = await countFilesInFolder('folder/', mockConfig);
    expect(result).toBe(2);
  });

  it('should handle pagination', async () => {
    mockList
      .mockResolvedValueOnce({
        items: [{ path: 'folder/file1.txt' }],
        nextToken: 'token1',
      })
      .mockResolvedValueOnce({
        items: [{ path: 'folder/file2.txt' }],
        nextToken: undefined,
      });

    const result = await countFilesInFolder('folder/', mockConfig);
    expect(result).toBe(2);
    expect(list).toHaveBeenCalledTimes(2);
  });

  it('should return "5000+" when file count exceeds limit', async () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({
      path: `folder/file${i}.txt`,
    }));

    mockList.mockResolvedValue({
      items,
      nextToken: 'token',
    });

    const result = await countFilesInFolder('folder/', mockConfig);
    expect(result).toBe('5000+');
  });

  it('should return "count+" when has more items but under limit', async () => {
    mockList
      .mockResolvedValueOnce({
        items: [{ path: 'folder/file1.txt' }],
        nextToken: 'token1',
      })
      .mockResolvedValueOnce({
        items: [{ path: 'folder/file2.txt' }],
        nextToken: 'token2',
      })
      .mockResolvedValueOnce({
        items: [{ path: 'folder/file3.txt' }],
        nextToken: 'token3',
      });

    // Mock to stop after 3 calls but still have nextToken
    let callCount = 0;
    mockList.mockImplementation(() => {
      callCount++;
      if (callCount <= 2) {
        return Promise.resolve({
          items: [{ path: `folder/file${callCount}.txt` }],
          nextToken: 'token',
        });
      }
      return Promise.resolve({
        items: [{ path: `folder/file${callCount}.txt` }],
        nextToken: 'final-token',
      });
    });

    const result = await countFilesInFolder('folder/', mockConfig);
    expect(typeof result).toBe('string');
    expect(result.toString().includes('+')).toBe(true);
  });

  it('should return 0 on error', async () => {
    mockList.mockRejectedValue(new Error('Network error'));

    const result = await countFilesInFolder('folder/', mockConfig);
    expect(result).toBe(0);
  });

  it('should filter out folders from count', async () => {
    mockList.mockResolvedValue({
      items: [
        { path: 'folder/file1.txt' },
        { path: 'folder/subfolder/' },
        { path: 'folder/file2.txt' },
        { path: 'folder/another-subfolder/' },
      ],
      nextToken: undefined,
    });

    const result = await countFilesInFolder('folder/', mockConfig);
    expect(result).toBe(2);
  });

  it('should handle empty folder', async () => {
    mockList.mockResolvedValue({
      items: [],
      nextToken: undefined,
    });

    const result = await countFilesInFolder('folder/', mockConfig);
    expect(result).toBe(0);
  });
});
