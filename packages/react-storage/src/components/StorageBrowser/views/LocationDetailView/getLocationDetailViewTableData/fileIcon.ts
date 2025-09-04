import type { StorageBrowserIconType } from '../../../components';
import { getFileExtension } from '../../utils/files/fileType';
import { EXTENSION_THUMBNAIL_MAPPINGS, GENERIC_FILE_ICON } from './constants';

export function getFileThumbnail(fileKey?: string): StorageBrowserIconType {
  const extension = getFileExtension(fileKey);

  if (!fileKey || !extension) return GENERIC_FILE_ICON;

  return EXTENSION_THUMBNAIL_MAPPINGS[extension] || GENERIC_FILE_ICON;
}
