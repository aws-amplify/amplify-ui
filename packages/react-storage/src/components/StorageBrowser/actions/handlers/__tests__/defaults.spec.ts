import { copyHandler } from '../copy';
import { createFolderHandler } from '../createFolder';
import { deleteHandler } from '../delete';
import { zipDownloadHandler } from '../zipdownload';
import { listLocationItemsHandler } from '../listLocationItems';
import { uploadHandler } from '../upload';
import { defaultHandlers } from '../defaults';

describe('defaultHandlers', () => {
  it('contains the expected handlers', () => {
    expect(defaultHandlers).toStrictEqual({
      copy: copyHandler,
      createFolder: createFolderHandler,
      delete: deleteHandler,
      download: zipDownloadHandler,
      listLocationItems: listLocationItemsHandler,
      upload: uploadHandler,
    });
  });
});
