import { processDroppedEntries } from '../processDroppedEntries';

describe('processDroppedEntries', () => {
  const mockFileData = new Blob(['test content'], { type: 'text/plain' });
  const mockFile = new File([mockFileData], 'test.txt', { type: 'text/plain' });

  const createMockFileEntry = (file: File): FileSystemFileEntry => ({
    isFile: true,
    isDirectory: false,
    name: file.name,
    fullPath: `/${file.name}`,
    filesystem: {
      name: 'temporary',
      root: {} as FileSystemDirectoryEntry,
    },
    file: (callback: (file: File) => void) => callback(file),
    getParent: jest.fn(),
  });

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

    const result = await processDroppedEntries(items);

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

    const result = await processDroppedEntries(items);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('test1.txt');
    expect(result[1].name).toBe('test2.txt');
  });

  it.todo('should process files in a directory');

  it.todo('should process mixed files and directories');

  it('should handle empty items array', async () => {
    const result = await processDroppedEntries([]);

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

    const result = await processDroppedEntries(items);

    expect(result).toHaveLength(0);
  });
});
