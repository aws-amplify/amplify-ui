import React from 'react';
import { render, screen } from '@testing-library/react';

import { Table } from '../Table';

describe('Table', () => {
  const headers = [
    { key: 'header-1', content: 'Header 1' },
    { key: 'header-2', content: 'Header 2' },
  ];
  const rows = [
    {
      key: 'row-1',
      content: [
        { key: 'row-1-col-1', content: 'Row 1 Col 1' },
        { key: 'row-1-col-2', content: 'Row 1 Col 2' },
      ],
    },
    {
      key: 'row-2',
      content: [
        { key: 'row-2-col-1', content: 'Row 2 Col 1' },
        { key: 'row-2-col-2', content: 'Row 2 Col 2' },
      ],
    },
  ];

  it('renders', () => {
    render(<Table headers={headers} rows={rows} />);

    const table = screen.getByRole('table');
    const tableRowGroups = screen.getAllByRole('rowgroup');
    const tableRows = screen.getAllByRole('row');
    const tableHeaders = screen.getAllByRole('columnheader');
    const tableDataCells = screen.getAllByRole('cell');

    expect(table).toBeInTheDocument();
    expect(tableRowGroups).toHaveLength(2);
    expect(tableRows).toHaveLength(3);
    expect(tableHeaders).toHaveLength(2);
    expect(tableDataCells).toHaveLength(4);
  });

  it('renders only headers', () => {
    render(<Table headers={headers} rows={[]} />);

    const tableRows = screen.getAllByRole('row');
    const tableHeaders = screen.getAllByRole('columnheader');
    const tableDataCells = screen.queryAllByRole('cell');

    expect(tableRows).toHaveLength(1);
    expect(tableHeaders).toHaveLength(2);
    expect(tableDataCells).toHaveLength(0);
  });

  it('renders only data cells', () => {
    render(<Table headers={[]} rows={rows} />);

    const tableRows = screen.getAllByRole('row');
    const tableHeaders = screen.queryAllByRole('columnheader');
    const tableDataCells = screen.getAllByRole('cell');

    expect(tableRows).toHaveLength(2);
    expect(tableHeaders).toHaveLength(0);
    expect(tableDataCells).toHaveLength(4);
  });

  it('renders headers in table body', () => {
    render(
      <Table
        headers={[]}
        rows={[
          {
            key: 'row-1',
            content: [
              { key: 'row-1-col-1', content: 'Row 1 Col 1', type: 'header' },
              { key: 'row-1-col-2', content: 'Row 1 Col 2' },
            ],
          },
          {
            key: 'row-2',
            content: [
              { key: 'row-2-col-1', content: 'Row 2 Col 1', type: 'header' },
              { key: 'row-2-col-2', content: 'Row 2 Col 2' },
            ],
          },
        ]}
      />
    );

    const tableRows = screen.getAllByRole('row');
    const tableHeaders = screen.queryAllByRole('columnheader');
    const tableRowHeaders = screen.getAllByRole('rowheader');
    const tableDataCells = screen.getAllByRole('cell');

    expect(tableRows).toHaveLength(2);
    expect(tableHeaders).toHaveLength(0);
    expect(tableRowHeaders).toHaveLength(2);
    expect(tableDataCells).toHaveLength(2);
  });
});
