import { copyHandler } from './copy';
import { createFolderHandler } from './createFolder';
import { deleteHandler } from './delete';
import { downloadHandler } from './download';
import { listLocationItemsHandler } from './listLocationItems';
import { listLocationsHandler } from './listLocations';
import { uploadHandler } from './upload';

export const DEFAULT_ACTION_HANDLERS = {
  copy: copyHandler,
  createFolder: createFolderHandler,
  delete: deleteHandler,
  download: downloadHandler,
  listLocationItems: listLocationItemsHandler,
  listLocations: listLocationsHandler,
  upload: uploadHandler,
};
