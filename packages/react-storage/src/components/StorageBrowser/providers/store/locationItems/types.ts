import { FileData, TaskData } from '../../../actions';

export interface FileDataItem extends FileData, TaskData {
  fileKey: string;
}
