export const isValidFolderName = (name: string | undefined): boolean =>
  !!name?.length && !name.includes('/') && !name.includes('.');
