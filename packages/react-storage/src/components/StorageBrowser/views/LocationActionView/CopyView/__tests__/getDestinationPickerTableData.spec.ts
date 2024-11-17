import { getDestinationPickerTableData } from '../getDestinationPickerTableData';

describe('getDestinationPickerTableData', () => {
  const prefix = 'test/prefix/';
  const path = 'path/';
  const key = `${prefix}${path}folder/`;
  it('returns the expected values', () => {
    const output = getDestinationPickerTableData({
      prefix,
      path,
      folders: [{ key, id: 'id' }],
      onSelectFolder: jest.fn(),
    });

    expect(output).toStrictEqual({
      headers: [
        { content: { label: 'Folder name' }, key: 'name', type: 'sort' },
      ],
      rows: [
        {
          content: [
            {
              content: {
                icon: 'folder',
                ariaLabel: 'folder/',
                label: 'folder/',
                onClick: expect.any(Function),
              },
              key: 'name-id',
              type: 'button',
            },
          ],
          key: 'id',
        },
      ],
    });
  });
});
