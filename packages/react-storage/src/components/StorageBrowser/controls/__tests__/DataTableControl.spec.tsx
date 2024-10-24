import React from 'react';
import { render, screen } from '@testing-library/react';
import { useResolvedComposable } from '../hooks/useResolvedComposable';
import { useDataTable } from '../hooks/useDataTable';
import { DataTableControl } from '../DataTableControl';

jest.mock('../hooks/useDataTable');
jest.mock('../hooks/useResolvedComposable');

describe('DataTableControl', () => {
  // assert mocks
  const mockUseDataTable = useDataTable as jest.Mock;
  const mockUseResolvedComposable = useResolvedComposable as jest.Mock;

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component: React.JSX.Element) => component
    );
  });

  afterEach(() => {
    mockUseDataTable.mockReset();
    mockUseResolvedComposable.mockClear();
  });

  it('renders', () => {
    mockUseDataTable.mockReturnValue({
      props: {
        headers: [
          {
            key: 'header-1',
            type: 'checkbox',
            content: { onSelect: jest.fn() },
          },
          { key: 'header-2', type: 'sort', content: {} },
          { key: 'header-3', type: 'text', content: {} },
          { key: 'header-4', type: 'text', content: {} },
          { key: 'header-5', type: 'text', content: {} },
        ],
        rows: [
          {
            key: 'row-1',
            content: [
              {
                key: 'row-1 data-cell-1',
                type: 'checkbox',
                content: { onSelect: jest.fn() },
              },
              { key: 'row-1 data-cell-2', type: 'button', content: {} },
              { key: 'row-1 data-cell-3', type: 'date', content: {} },
              { key: 'row-1 data-cell-4', type: 'number', content: {} },
              { key: 'row-1 data-cell-5', type: 'text', content: {} },
            ],
          },
          {
            key: 'row-2',
            content: [
              {
                key: 'row-2 data-cell-1',
                type: 'checkbox',
                content: { onSelect: jest.fn() },
              },
              { key: 'row-2 data-cell-2', type: 'button', content: {} },
              { key: 'row-2 data-cell-3', type: 'date', content: {} },
              { key: 'row-2 data-cell-4', type: 'number', content: {} },
              { key: 'row-2 data-cell-5', type: 'text', content: {} },
            ],
          },
        ],
      },
    });

    render(<DataTableControl />);

    const table = screen.getByRole('table');
    const tableRowGroups = screen.getAllByRole('rowgroup');
    const tableRows = screen.getAllByRole('row');
    const tableHeaders = screen.getAllByRole('columnheader');
    const tableDataCells = screen.getAllByRole('cell');

    expect(table).toBeInTheDocument();
    expect(tableRowGroups).toHaveLength(2);
    expect(tableRows).toHaveLength(3);
    expect(tableHeaders).toHaveLength(5);
    expect(tableDataCells).toHaveLength(10);
  });
});
