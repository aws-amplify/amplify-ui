export const filterAllowedFiles = (
  files: File[],
  acceptedFileTypes?: string[]
): File[] => {
  // Allow any files if acceptedFileTypes is undefined, empty array, or contains '*'
  if (
    !acceptedFileTypes ||
    acceptedFileTypes.length === 0 ||
    acceptedFileTypes.includes('*')
  ) {
    return files;
  }

  // Remove any files that are not in the accepted file list
  return files.filter((file) => {
    const fileName = file.name || '';
    const mimeType = (file.type || '').toLowerCase();
    const baseMimeType = mimeType.replace(/\/.*$/, '');
    return acceptedFileTypes.some((type) => {
      const validType = type.trim().toLowerCase();
      if (validType.charAt(0) === '.') {
        return fileName.toLowerCase().endsWith(validType);
      } else if (validType.endsWith('/*')) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '');
      }
      return mimeType === validType;
    });
  });
};
