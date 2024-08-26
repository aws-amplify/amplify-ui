import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Data,
  ColumnHeaderItemProps,
  RowDataItemProps,
  DataTable,
} from '../DataTable';

interface RowData extends RowDataItemProps {
  children?: React.ReactNode;
  className?: string;
}

interface ColumnData extends ColumnHeaderItemProps {
  children?: React.ReactNode;
  className?: string;
}

describe('TableV2', () => {
  const renderColumnItem = (column: ColumnData) => (
    <th {...column} className={column.className}>
      {column.children}
    </th>
  );

  const renderRowItem = (row: RowData) => (
    <td {...row} className={row.className}>
      {row.children}
    </td>
  );

  it('renders the table with column headers and rows', () => {
    const data: Data<RowData, ColumnData> = {
      columns: [
        { key: 'column1', children: 'Header 1', className: 'header-class' },
        { key: 'column2', children: 'Header 2', className: 'header-class' },
      ],
      rows: [
        [
          {
            key: 'row1-column1',
            children: 'Row 1 Column 1',
            className: 'my-class',
          },
          {
            key: 'row1-column2',
            children: 'Row 1 Column 2',
            className: 'my-class',
          },
        ],
        [
          {
            key: 'row2-column1',
            children: 'Row 2 Column 1',
            className: 'my-class',
          },
          {
            key: 'row2-column2',
            children: 'Row 2 Column 2',
            className: 'my-class',
          },
        ],
      ],
    };

    const { getByText } = render(
      <DataTable
        data={data}
        renderColumnHeaderItem={renderColumnItem}
        renderRowDataItem={renderRowItem}
      />
    );

    // Check column headers
    expect(getByText('Header 1')).toBeInTheDocument();
    expect(getByText('Header 2')).toBeInTheDocument();

    // Check row data
    expect(getByText('Row 1 Column 1')).toBeInTheDocument();
    expect(getByText('Row 1 Column 2')).toBeInTheDocument();
    expect(getByText('Row 2 Column 1')).toBeInTheDocument();
    expect(getByText('Row 2 Column 2')).toBeInTheDocument();
  });

  it('renders only rows when columns are not provided', () => {
    const data: Data<RowData, ColumnData> = {
      rows: [
        [
          {
            key: 'row1-column1',
            children: 'Row 1 Column 1',
            className: 'my-class',
          },
          {
            key: 'row1-column2',
            children: 'Row 1 Column 2',
            className: 'my-class',
          },
        ],
      ],
    };

    const { getByText } = render(
      <DataTable
        data={data}
        renderColumnHeaderItem={renderColumnItem}
        renderRowDataItem={renderRowItem}
      />
    );

    // Check that no headers are rendered
    expect(screen.queryByRole('columnheader')).not.toBeInTheDocument();

    // Check row data
    expect(getByText('Row 1 Column 1')).toBeInTheDocument();
    expect(getByText('Row 1 Column 2')).toBeInTheDocument();
  });

  it('renders only column headers when rows are not provided', () => {
    const data: Data<RowData, ColumnData> = {
      columns: [
        { key: 'column1', children: 'Header 1', className: 'header-class' },
        { key: 'column2', children: 'Header 2', className: 'header-class' },
      ],
      rows: [],
    };

    const { getByText } = render(
      <DataTable
        data={data}
        renderColumnHeaderItem={renderColumnItem}
        renderRowDataItem={renderRowItem}
      />
    );

    // Check column headers
    expect(getByText('Header 1')).toBeInTheDocument();
    expect(getByText('Header 2')).toBeInTheDocument();

    // Check that no rows are rendered
    expect(screen.queryAllByRole('cell')).toHaveLength(0);
  });
});
