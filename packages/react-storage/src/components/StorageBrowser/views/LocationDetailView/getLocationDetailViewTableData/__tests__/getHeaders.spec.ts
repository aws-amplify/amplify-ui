import { getHeaders } from '../getHeaders';

describe('getHeaders', () => {
  const mockProps = {
    tableColumnLastModifiedHeader: 'Custom Last Modified',
    tableColumnNameHeader: 'Custom Name',
    tableColumnSizeHeader: 'Custom Size',
    tableColumnTypeHeader: 'Custom Type',
    areAllFilesSelected: false,
    selectAllFilesLabel: 'Select all files',
    onSelectAll: jest.fn(),
    hasFiles: true,
  };

  it('should return correct headers when files exist', () => {
    const result = getHeaders(mockProps);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          content: { label: mockProps.tableColumnNameHeader },
        }),
        expect.objectContaining({
          content: { label: mockProps.tableColumnTypeHeader },
        }),
        expect.objectContaining({
          content: { label: mockProps.tableColumnSizeHeader },
        }),
        expect.objectContaining({
          content: { label: mockProps.tableColumnLastModifiedHeader },
        }),
      ])
    );
  });

  it('should include checkbox column when hasFiles is true', () => {
    const result = getHeaders(mockProps);

    const checkboxColumn = result.find((header) => header.type === 'checkbox');
    expect(checkboxColumn).toBeDefined();
  });

  it('should not include checkbox column when hasFiles is false', () => {
    const result = getHeaders({
      ...mockProps,
      hasFiles: false,
    });

    const checkboxColumn = result.find((header) => header.type === 'checkbox');
    expect(checkboxColumn).toBeUndefined();
  });
});
