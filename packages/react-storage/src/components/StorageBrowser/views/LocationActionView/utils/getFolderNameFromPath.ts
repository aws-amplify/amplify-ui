export const getFolderNameFromPath = (path: string): string => {
  const splitPath = path.split('/');
  return splitPath[splitPath.length - 2];
};
