import {
  getDestinationListFullPrefix,
  getDestinationPickerTableData,
} from '../utils';

describe('getDestinationListFullPrefix', () => {
  it('returns an empty string when provided an empty array', () => {
    const output = getDestinationListFullPrefix([]);

    expect(output).toBe('');
  });

  it('returns an empty string when provided an single length array with an empty string value', () => {
    const output = getDestinationListFullPrefix(['']);

    expect(output).toBe('');
  });

  it('filters empty string values', () => {
    const output = getDestinationListFullPrefix(['', 'prefix', 'nested/']);

    expect(output).toBe('prefix/nested/');
  });

  it('postfixes a / character when missing from the last value', () => {
    const output = getDestinationListFullPrefix(['', 'prefix', 'nested']);

    expect(output).toBe('prefix/nested/');
  });
});

describe('getDestinationPickerTableData', () => {
  it('returns the expected values', () => {
    const handleNavigateFolder = jest.fn();
    const output = getDestinationPickerTableData({
      handleNavigateFolder,
      items: [{ key: 'key', id: 'id' }],
    });

    expect(output).toStrictEqual({
      headers: [
        { content: { label: 'Folder name' }, key: 'key', type: 'sort' },
      ],
      rows: [
        {
          content: [
            {
              content: {
                icon: 'folder',
                label: '',
                onClick: expect.any(Function),
              },
              key: 'id',
              type: 'button',
            },
          ],
          key: 'id',
        },
      ],
    });
  });
});
