import type { CopyHandler } from './copy';
import { copyHandler } from './copy';
import type { CreateFolderHandler } from './createFolder';
import { createFolderHandler } from './createFolder';
import type { DeleteHandler } from './delete';
import { deleteHandler } from './delete';
import type { DownloadHandler } from './download';
import { downloadHandler } from './download';
import { zipDownloadHandler } from './zipdownload';
import type { ListLocationItemsHandler } from './listLocationItems';
import { listLocationItemsHandler } from './listLocationItems';
import type { UploadHandler } from './upload';
import { uploadHandler } from './upload';

const composedDownloadHandler: DownloadHandler = (input) =>
  input.all.length === 1 ? downloadHandler(input) : zipDownloadHandler(input);

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
  download: composedDownloadHandler,
  listLocationItems: listLocationItemsHandler,
  upload: uploadHandler,
};
