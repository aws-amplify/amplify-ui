/**
 * Extracts the filename from a file key path
 * @param fileKey - The full file key/path
 * @returns The filename (last part after '/') or empty string if fileKey is null/undefined
 */
export function getFileName(fileKey: string | null | undefined): string {
  if (!fileKey) return '';
  return fileKey.split('/').pop() ?? fileKey;
}
