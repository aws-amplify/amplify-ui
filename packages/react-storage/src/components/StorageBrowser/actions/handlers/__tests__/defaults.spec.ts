import { copyHandler } from '../copy';
import { createFolderHandler } from '../createFolder';
import { deleteHandler } from '../delete';
import { downloadHandler } from '../download';
import { listLocationItemsHandler } from '../listLocationItems';
import { uploadHandler } from '../upload';
import { defaultActionHandlers } from '../defaults';

describe('defaultActionHandlers', () => {
  it('contains the expected handlers', () => {
    expect(defaultActionHandlers).toStrictEqual({
      copy: copyHandler,
      createFolder: createFolderHandler,
      delete: deleteHandler,
      download: downloadHandler,
      listLocationItems: listLocationItemsHandler,
      upload: uploadHandler,
    });
  });
});
