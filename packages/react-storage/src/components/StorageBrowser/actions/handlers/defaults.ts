import type { CopyHandler } from './copy';
import { copyHandler } from './copy';
import type { CreateFolderHandler } from './createFolder';
import { createFolderHandler } from './createFolder';
import type { DeleteHandler } from './delete';
import { deleteHandler } from './delete';
import type { DownloadHandler } from './download';
import { downloadHandler } from './download';
import type { ListLocationItemsHandler } from './listLocationItems';
import { listLocationItemsHandler } from './listLocationItems';
import type { UploadHandler } from './upload';
import { uploadHandler } from './upload';

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
