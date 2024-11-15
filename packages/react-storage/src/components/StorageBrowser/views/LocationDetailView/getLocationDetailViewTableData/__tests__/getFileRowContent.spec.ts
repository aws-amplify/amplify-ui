import { LocationPermissions } from '../../../../actions';
import { getFileRowContent } from '../getFileRowContent';

describe('getFileRowContent', () => {
  const location = {
    current: {
      bucket: 'bucket',
      id: 'id',
      permissions: ['list', 'get'] satisfies LocationPermissions,
      prefix: 'prefix/',
      type: 'PREFIX',
    },
    path: 'path/',
    key: 'prefix/path/',
  } as const;
  const fileItem = {
    key: 'file-key.ext',
    lastModified: new Date(1),
    id: 'file-id',
    size: 1,
    type: 'FILE',
  } as const;
  const itemLocationKey = `${location.current.prefix}${location.path}`;

  it('should return file row content as expected', () => {
    expect(
      getFileRowContent({
        permissions: location.current.permissions,
        itemLocationKey,
        isSelected: false,
        lastModified: fileItem.lastModified,
        rowId: 'row-id',
        rowKey: `${location.current.prefix}${location.path}${fileItem.key}`,
        size: fileItem.size,
        selectFileLabel: 'Select file',
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

  it('should not render download button if location permission does not support download', () => {
    const row = getFileRowContent({
      permissions: ['list'],
      itemLocationKey,
      isSelected: false,
      lastModified: fileItem.lastModified,
      rowId: 'row-id',
      rowKey: `${location.current.prefix}${location.path}${fileItem.key}`,
      size: fileItem.size,
      selectFileLabel: 'Select file',
      onDownload: jest.fn(),
      onSelect: jest.fn(),
    });
    const fileActionCell = row[5];
    expect(fileActionCell).toMatchObject({
      type: 'text',
      content: expect.objectContaining({ text: '' }),
    });
  });
});
