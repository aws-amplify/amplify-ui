import { getFileKey, FileData } from '../../../actions';
import { FileDataItem } from './types';

export const isFileDataItem = (item: unknown): item is FileDataItem =>
  !!(item as FileDataItem).fileKey;

export const createFileDataItem = (data: FileData): FileDataItem => ({
  ...data,
  fileKey: getFileKey(data.key),
});
