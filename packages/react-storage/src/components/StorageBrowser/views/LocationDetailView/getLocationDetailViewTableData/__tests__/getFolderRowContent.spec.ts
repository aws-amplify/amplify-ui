import { getFolderRowContent } from '../getFolderRowContent';

describe('getFolderRowContent', () => {
  const folderItem = {
    key: 'path/',
    id: 'folder-id',
    type: 'FOLDER',
  } as const;

  it('should return folder row content as expected', () => {
    expect(
      getFolderRowContent({
        itemSubPath: folderItem.key,
        rowId: 'row-id',
        onNavigate: jest.fn(),
        onSelect: jest.fn(),
        isSelected: false,
        selectFolderLabel: 'Select folder',
      })
    ).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'text', content: { text: '' } }),
        expect.objectContaining({
          type: 'button',
          content: expect.objectContaining({ label: folderItem.key }),
        }),
        expect.objectContaining({ type: 'text', content: { text: 'Folder' } }),
        expect.objectContaining({ type: 'text', content: { text: '' } }),
        expect.objectContaining({ type: 'text', content: { text: '' } }),
        expect.objectContaining({ type: 'text', content: { text: '' } }),
      ])
    );
  });
});
