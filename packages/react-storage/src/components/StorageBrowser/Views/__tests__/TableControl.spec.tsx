import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableControl } from '../';
import { Column, Data } from '../Controls/Table';

interface LocationTest extends Data {
  permission?: string;
  created?: string;
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
});
