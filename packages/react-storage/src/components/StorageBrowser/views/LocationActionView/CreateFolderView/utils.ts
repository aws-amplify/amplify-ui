export const isValidFolderName = (name: string | undefined): boolean =>
  !!name?.length &&
  !name.includes('/') &&
  !name.trim().endsWith('.') &&
  !name.trim().startsWith('.');
