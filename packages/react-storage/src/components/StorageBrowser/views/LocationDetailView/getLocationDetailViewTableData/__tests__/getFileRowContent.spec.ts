import { getFileRowContent } from '../getFileRowContent';

describe('getFileRowContent', () => {
  const currentLocation = {
    bucket: 'bucket',
    id: 'id',
    permission: 'READ',
    prefix: 'prefix/',
    type: 'PREFIX',
  } as const;
  const currentPath = 'path/';
  const fileItem = {
    key: 'file-key.ext',
    lastModified: new Date(1),
    id: 'file-id',
    size: 1,
    type: 'FILE',
  } as const;

  it('should return file row content as expected', () => {
    expect(
      getFileRowContent({
        currentLocation,
        currentPath,
        isSelected: false,
        lastModified: fileItem.lastModified,
        rowId: 'row-id',
        rowKey: `${currentLocation.prefix}${currentPath}${fileItem.key}`,
        size: fileItem.size,
        onDownload: jest.fn(),
        onSelect: jest.fn(),
      })
    ).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'checkbox',
          content: expect.objectContaining({
            checked: false,
            label: expect.stringContaining(fileItem.key),
          }),
        }),
        expect.objectContaining({
          type: 'text',
          content: expect.objectContaining({ text: fileItem.key }),
        }),
        expect.objectContaining({
          type: 'text',
          content: expect.objectContaining({ text: 'ext' }),
        }),
        expect.objectContaining({
          type: 'date',
          content: expect.objectContaining({ date: fileItem.lastModified }),
        }),
        expect.objectContaining({
          type: 'number',
          content: expect.objectContaining({ value: fileItem.size }),
        }),
        expect.objectContaining({
          type: 'button',
          content: expect.objectContaining({ onClick: expect.any(Function) }),
        }),
      ])
    );
  });
});
