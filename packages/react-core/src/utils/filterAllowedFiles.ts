// Drag event file shape is different than the drop event fileshape
type DragFile =
  | {
      kind: string;
      type: string;
      name?: string;
    }
  | File;

export function filterAllowedFiles<FileType extends DragFile = DragFile>(
  files: FileType[],
  acceptedFileTypes: string[]
): { acceptedFiles: FileType[]; rejectedFiles: FileType[] } {
  // Allow any files if acceptedFileTypes is undefined, empty array, or contains '*'
  if (
    !acceptedFileTypes ||
    acceptedFileTypes.length === 0 ||
    acceptedFileTypes.includes('*')
  ) {
    return { acceptedFiles: files, rejectedFiles: [] };
  }
  const acceptedFiles: FileType[] = [];
  const rejectedFiles: FileType[] = [];

  function filterFile(file: DragFile) {
    const { type = '', name = '' } = file;
    const mimeType = type.toLowerCase();
    const baseMimeType = mimeType.split('/')[0];

    return acceptedFileTypes.some((type) => {
      const validType = type.trim().toLowerCase();
      // if the accepted file type is a file extension
      // it will start with '.', check against the file name
      if (validType.charAt(0) === '.') {
        return name.toLowerCase().endsWith(validType);
      }
      // This is something like a image/* mime type
      if (validType.endsWith('/*')) {
        return baseMimeType === validType.split('/')[0];
      }
      return mimeType === validType;
    });
  }

  files.forEach((file) => {
    (filterFile(file) ? acceptedFiles : rejectedFiles).push(file);
  });

  return { acceptedFiles, rejectedFiles };
}
