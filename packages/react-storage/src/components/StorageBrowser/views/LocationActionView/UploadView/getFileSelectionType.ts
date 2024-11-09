import { FileItems } from '../../../providers';

export const getFileSelectionType = (
  actionType?: string,
  files?: FileItems
): 'FILE' | 'FOLDER' | undefined => {
  if (files?.length ?? !actionType) return undefined;

  return actionType === 'UPLOAD_FILES' ? 'FILE' : 'FOLDER';
};
