import { getFolderRowContent } from '../getFolderRowContent';
import { LOCATION_DETAIL_VIEW_HEADERS } from '../constants';

describe('getFolderRowContent', () => {
  const folderItem = {
    key: 'path/',
    id: 'folder-id',
    type: 'FOLDER',
  } as const;

  it('should return folder row content as expected', () => {
    expect(
      getFolderRowContent({
        headers: LOCATION_DETAIL_VIEW_HEADERS,
        rowKey: folderItem.key,
        rowId: 'row-id',
        onNavigate: jest.fn(),
      })
    ).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'text', content: { text: '' } }),
        expect.objectContaining({
          type: 'button',
          content: expect.objectContaining({ label: 'path' }),
        }),
        expect.objectContaining({ type: 'text', content: { text: 'Folder' } }),
        expect.objectContaining({ type: 'text', content: { text: '' } }),
        expect.objectContaining({ type: 'text', content: { text: '' } }),
        expect.objectContaining({ type: 'text', content: { text: '' } }),
      ])
    );
  });
});
