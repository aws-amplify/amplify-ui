import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTable } from '../../DataTable';

describe('DataTable', () => {
  it('renders', () => {
    const headers = [
      {
        key: 'header-1',
        type: 'checkbox' as const,
        content: { onSelect: jest.fn() },
      },
      {
        key: 'header-2',
        type: 'sort' as const,
        content: { label: 'header-2-sort' },
      },
      {
        key: 'header-3',
        type: 'text' as const,
        content: { text: 'header-3-text' },
      },
    ];

    const rows = [
      {
        key: 'row-1',
        content: [
          {
            key: 'row-1 data-cell-1',
            type: 'checkbox' as const,
            content: { onSelect: jest.fn() },
          },
          {
            key: 'row-1 data-cell-2',
            type: 'button' as const,
            content: { label: 'row-1-button' },
          },
          {
            key: 'row-1 data-cell-3',
            type: 'date' as const,
            content: { date: new Date(1726704000000) },
          },
        ],
      },
      {
        key: 'row-2',
        content: [
          {
            key: 'row-2 data-cell-1',
            type: 'checkbox' as const,
            content: { onSelect: jest.fn() },
          },
          {
            key: 'row-2 data-cell-2',
            type: 'number' as const,
            content: { displayValue: 'row-2-number' },
          },
          {
            key: 'row-2 data-cell-3',
            type: 'text' as const,
            content: { text: 'row-2-text' },
          },
        ],
      },
    ];

    render(<DataTable headers={headers} rows={rows} />);

    const table = screen.getByRole('table');
    const tableRowGroups = screen.getAllByRole('rowgroup');
    const tableRows = screen.getAllByRole('row');
    const tableHeaders = screen.getAllByRole('columnheader');
    const tableDataCells = screen.getAllByRole('cell');
    const [headerCheckbox, row1Checkbox, row2Checkbox] =
      screen.getAllByRole('checkbox');

    expect(table).toBeInTheDocument();
    expect(tableRowGroups).toHaveLength(2);
    expect(tableRows).toHaveLength(3);
    expect(tableHeaders).toHaveLength(3);
    expect(tableDataCells).toHaveLength(6);

    const [header1, header2, header3] = tableHeaders;
    expect(header1).toContainElement(headerCheckbox);
    expect(header2).toHaveTextContent('Header-2-sort');
    expect(header3).toHaveTextContent('Header-3-text');

    const [
      row1DataCell1,
      row1DataCell2,
      row1DataCell3,
      row2DataCell1,
      row2DataCell2,
      row2DataCell3,
    ] = tableDataCells;
    expect(row1DataCell1).toContainElement(row1Checkbox);
    expect(row1DataCell2).toHaveTextContent('row-1-button');
    expect(row1DataCell3).toHaveTextContent(/.+/); // Expect any string rather than deal with mocking locale
    expect(row2DataCell1).toContainElement(row2Checkbox);
    expect(row2DataCell2).toHaveTextContent('row-2-number');
    expect(row2DataCell3).toHaveTextContent('row-2-text');
  });
});
