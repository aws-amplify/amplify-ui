import { copyHandler, CopyHandler } from './copy';
import { createFolderHandler, CreateFolderHandler } from './createFolder';
import { deleteHandler, DeleteHandler } from './delete';
import { downloadHandler, DownloadHandler } from './download';
import {
  listLocationItemsHandler,
  ListLocationItemsHandler,
} from './listLocationItems';
import { uploadHandler, UploadHandler } from './upload';

export interface DefaultHandlers {
  copy: CopyHandler;
  createFolder: CreateFolderHandler;
  delete: DeleteHandler;
  download: DownloadHandler;
  listLocationItems: ListLocationItemsHandler;
  upload: UploadHandler;
}

export const defaultHandlers: DefaultHandlers = {
  copy: copyHandler,
  createFolder: createFolderHandler,
  delete: deleteHandler,
  download: downloadHandler,
  listLocationItems: listLocationItemsHandler,
  upload: uploadHandler,
};
