// Helper function to convert FileSystemFileEntry to File
const getFileFromEntry = (fileEntry: FileSystemFileEntry): Promise<File> => {
  return new Promise((resolve) => {
    fileEntry.file(resolve);
  });
};

// Helper function to read all entries in a directory
const readAllDirectoryEntries = async (
  dirReader: FileSystemDirectoryReader
): Promise<FileSystemEntry[]> => {
  const entries: FileSystemEntry[] = [];

  let readBatch: FileSystemEntry[] = [];
  do {
    readBatch = await new Promise<FileSystemEntry[]>((resolve, reject) => {
      try {
        dirReader.readEntries(resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
    entries.push(...readBatch);
  } while (readBatch.length > 0);

  return entries;
};

// Helper function to process files and folder contents
export async function processDroppedItems(
  dataTransferItems: DataTransferItem[]
): Promise<File[]> {
  const files: File[] = [];

  const processFileSystemEntry = async (
    entry: FileSystemEntry
  ): Promise<void> => {
    if (entry.isFile) {
      const file = await getFileFromEntry(entry as FileSystemFileEntry);
      files.push(file);
    } else if (entry.isDirectory) {
      const dirReader = (entry as FileSystemDirectoryEntry).createReader();
      const dirEntries = await readAllDirectoryEntries(dirReader);
      await Promise.all(dirEntries.map(processFileSystemEntry));
    }
  };

  // Filter out and process files from the data transfer items
  await Promise.all(
    dataTransferItems
      .reduce<FileSystemEntry[]>(
        (acc, { kind, webkitGetAsEntry }) =>
          kind === 'file' && webkitGetAsEntry()
            ? [...acc, webkitGetAsEntry()!]
            : acc,
        []
      )
      .map(processFileSystemEntry)
  );

  return files;
}
