import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableControl } from '../';
import { Column, Data } from '../Controls/Table';
import { useSortHandler } from '../../hooks/useSortHandler';

interface LocationTest extends Data {
  permission?: string;
  created?: string;
}

function TestComponent() {
  const rows: LocationTest[] = [
    {
      name: 'alocation1',
      permission: 'read/write',
      created: 'May 4, 2023',
    },
    {
      name: 'loc2',
      permission: 'read',
      created: 'Jan 23, 1990',
    },
    {
      name: 'putnametest',
      permission: 'read',
      created: 'July 18, 2024',
    },
    {
      name: 'authfoldertest',
      permission: 'read/write',
      created: 'September 20, 2022',
    },
  ];

  const columns: Column<LocationTest>[] = [
    {
      header: 'Name',
      key: 'name',
      sortable: true,
      sortType: 'string',
    },
    {
      header: 'Permission',
      key: 'permission',
      sortable: false,
    },
    {
      header: 'Created',
      key: 'created',
      sortable: true,
      sortType: 'date',
    },
  ];

  const { rowData, sortState, handleSort } = useSortHandler(rows);

  return (
    <TableControl
      data={{ columns, rows: rowData }}
      ariaLabel="My test table"
      onSort={handleSort}
      sortState={sortState}
    />
  );
}

describe('TableControl', () => {
  it('renders the non-sortable TableControl', async () => {
    const rows = [
      {
        name: 'alocation1',
        permission: 'read/write',
        created: 'May 4, 2023',
      },
      {
        name: 'loc2',
        permission: 'read',
        created: 'Jan 23, 1990',
      },
      {
        name: 'putnametest',
        permission: 'read',
        created: 'July 18, 2024',
      },
      {
        name: 'authfoldertest',
        permission: 'read/write',
        created: 'September 20, 2022',
      },
    ];

    const columns: Column<LocationTest>[] = [
      {
        header: 'Name',
        key: 'name',
        sortable: true,
        sortType: 'string',
      },
      {
        header: 'Permission',
        key: 'permission',
        sortable: false,
      },
      {
        header: 'Created',
        key: 'created',
        sortable: true,
        sortType: 'date',
      },
    ];

    render(<TableControl data={{ columns, rows }} ariaLabel="My test table" />);

    const tableAriaLabel = await screen.findByLabelText('My test table');

    expect(tableAriaLabel).toBeInTheDocument();
  });

  it('renders sortable TableControl', async () => {
    render(<TestComponent />);

    const tableAriaLabel = await screen.findByLabelText('My test table');

    expect(tableAriaLabel).toBeInTheDocument();

    const tableHead = tableAriaLabel.querySelector('thead');
    const tableHeadRow = tableHead!.children;
    const tableHeaders = tableHeadRow[0].children;

    expect(tableHeaders).not.toBeUndefined();

    for (const th of Array.from(tableHeaders)) {
      expect(th).toHaveAttribute('aria-sort', 'none');
    }
  });
});
