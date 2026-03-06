import { processDroppedItems } from '../processDroppedItems';

describe('processDroppedItems', () => {
  const mockFileData = new Blob(['test content'], { type: 'text/plain' });
  const mockFile = new File([mockFileData], 'test.txt', { type: 'text/plain' });

  const createMockFileEntry = (file: File): FileSystemFileEntry => ({
    isFile: true,
    isDirectory: false,
    name: file.name,
    fullPath: `path/${file.name}`,
    filesystem: {
      name: 'temporary',
      root: {} as FileSystemDirectoryEntry,
    },
    file: (callback: (file: File) => void) => callback(file),
    getParent: jest.fn(),
  });

  const createMockDirectoryEntry = (
    files: File[]
  ): FileSystemDirectoryEntry => {
    const entries = files.map((file) => createMockFileEntry(file));
    let firstCall = true;
    return {
      getDirectory: jest.fn(),
      getFile: jest.fn(),
      isFile: false,
      isDirectory: true,
      name: 'test-directory',
      fullPath: '/test-directory',
      filesystem: {
        name: 'temporary',
        root: {} as FileSystemDirectoryEntry,
      },
      createReader: () => ({
        readEntries: (resolve) => {
          if (firstCall) {
            firstCall = false;
            resolve(entries);
          } else {
            resolve([]);
          }
        },
      }),
      getParent: jest.fn(),
    };
  };

  const createMockDataTransferItem = (
    entry: FileSystemEntry
  ): DataTransferItem => ({
    getAsFile: jest.fn(),
    getAsString: jest.fn(),
    kind: 'file',
    type: 'text/plain',
    webkitGetAsEntry: () => entry,
  });

  it('should process a single file', async () => {
    const fileEntry = createMockFileEntry(mockFile);
    const items = [createMockDataTransferItem(fileEntry)];

    const result = await processDroppedItems(items);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('test.txt');
    expect(result[0].type).toBe('text/plain');
  });

  it('should process multiple files', async () => {
    const file1 = new File([mockFileData], 'test1.txt', { type: 'text/plain' });
    const file2 = new File([mockFileData], 'test2.txt', { type: 'text/plain' });
    const items = [
      createMockDataTransferItem(createMockFileEntry(file1)),
      createMockDataTransferItem(createMockFileEntry(file2)),
    ];

    const result = await processDroppedItems(items);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('test1.txt');
    expect(result[1].name).toBe('test2.txt');
  });

  it('should process files in a directory', async () => {
    const filesInDir = [
      new File([mockFileData], 'dir-file1.txt', { type: 'text/plain' }),
      new File([mockFileData], 'dir-file2.txt', { type: 'text/plain' }),
    ];
    const dirEntry = createMockDirectoryEntry(filesInDir);
    const items = [createMockDataTransferItem(dirEntry)];

    const result = await processDroppedItems(items);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('dir-file1.txt');
    expect(result[1].name).toBe('dir-file2.txt');
    expect(result[0].webkitRelativePath).toBe('path/dir-file1.txt');
  });

  it('should process mixed files and directories', async () => {
    const singleFile = new File([mockFileData], 'single.txt', {
      type: 'text/plain',
    });
    const filesInDir = [
      new File([mockFileData], 'dir-file1.txt', { type: 'text/plain' }),
      new File([mockFileData], 'dir-file2.txt', { type: 'text/plain' }),
    ];
    const items = [
      createMockDataTransferItem(createMockFileEntry(singleFile)),
      createMockDataTransferItem(createMockDirectoryEntry(filesInDir)),
    ];

    const result = await processDroppedItems(items);

    expect(result).toHaveLength(3);
    expect(result.map((f) => f.name)).toContain('single.txt');
    expect(result.map((f) => f.name)).toContain('dir-file1.txt');
    expect(result.map((f) => f.name)).toContain('dir-file2.txt');
    expect(result[1].webkitRelativePath).toBe('path/dir-file1.txt');
  });

  it('should not overwrite webkitRelativePath if present', async () => {
    const singleFile = new File([mockFileData], 'single.txt', {
      type: 'text/plain',
    });
    Object.defineProperties(singleFile, {
      webkitRelativePath: {
        writable: true,
      },
    });
    // intentionally overwriting webkitRelativePath
    // @ts-expect-error
    singleFile.webkitRelativePath = 'webkitpath/single.txt';

    const items = [createMockDataTransferItem(createMockFileEntry(singleFile))];

    const result = await processDroppedItems(items);

    expect(result).toHaveLength(1);
    expect(result[0].webkitRelativePath).toBe('webkitpath/single.txt');
  });

  it('should handle empty items array', async () => {
    const result = await processDroppedItems([]);

    expect(result).toHaveLength(0);
  });

  it('should handle non-file items', async () => {
    const items = [
      {
        kind: 'string',
        type: 'text/plain',
        webkitGetAsEntry: () => null,
      },
    ] as DataTransferItem[];

    const result = await processDroppedItems(items);

    expect(result).toHaveLength(0);
  });
});
