import { copyHandler } from './copy';
import { createFolderHandler } from './createFolder';
import { deleteHandler } from './delete';
import { downloadHandler } from './download';
import { listLocationItemsHandler } from './listLocationItems';
import { uploadHandler } from './upload';

export const defaultActionHandlers = {
  copy: copyHandler,
  createFolder: createFolderHandler,
  delete: deleteHandler,
  download: downloadHandler,
  listLocationItems: listLocationItemsHandler,
  upload: uploadHandler,
};
