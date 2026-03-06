import { getFolderRowContent } from '../getFolderRowContent';
import type { DataTableCheckboxDataCell } from '../../../../components';

describe('getFolderRowContent', () => {
  const folderItem = {
    key: 'path/',
    id: 'folder-id',
    type: 'FOLDER',
  } as const;

  const mockProps = {
    itemSubPath: folderItem.key,
    rowId: 'row-id',
    onNavigate: jest.fn(),
    onSelect: jest.fn(),
    isSelected: false,
    selectFolderLabel: 'Select folder',
  };

  it('should return folder row content as expected', () => {
    expect(getFolderRowContent(mockProps)).toStrictEqual(
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

  it('should return checkbox content for folder selection', () => {
    const result = getFolderRowContent(mockProps);
    const checkboxCell = result.find((cell) => cell.type === 'checkbox');

    expect(checkboxCell).toEqual({
      key: 'checkbox-row-id',
      type: 'checkbox',
      content: {
        checked: false,
        id: 'checkbox-row-id',
        label: 'Select folder path/',
        onSelect: mockProps.onSelect,
      },
    });
  });

  it('should handle selected folder state', () => {
    const selectedProps = { ...mockProps, isSelected: true };
    const result = getFolderRowContent(selectedProps);
    const checkboxCell = result.find((cell) => cell.type === 'checkbox');

    expect(checkboxCell?.content).toEqual(
      expect.objectContaining({ checked: true })
    );
  });

  it('should call onSelect when checkbox is interacted with', () => {
    const result = getFolderRowContent(mockProps);
    const checkboxCell = result.find(
      (cell) => cell.type === 'checkbox'
    ) as DataTableCheckboxDataCell;

    expect(checkboxCell?.content.onSelect).toBe(mockProps.onSelect);
  });
});
