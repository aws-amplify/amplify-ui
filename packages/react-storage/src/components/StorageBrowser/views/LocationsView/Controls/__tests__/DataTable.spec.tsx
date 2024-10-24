import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import * as UseLocationsDataModule from '../../../../context/actions';
import * as UseControlModule from '../../../../context/control';
import { LocationAccess } from '../../../../context/types';

import { DataTableControl } from '../DataTable';

const useControlModuleSpy = jest.spyOn(UseControlModule, 'useControl');
const useLocationsDataSpy = jest.spyOn(
  UseLocationsDataModule,
  'useLocationsData'
);

const mockData: LocationAccess<UseLocationsDataModule.Permission>[] = [
  { scope: 's3://Location A/*', type: 'BUCKET', permission: 'READ' },
  { scope: 's3://Location B/Folder B/*', type: 'PREFIX', permission: 'WRITE' },
];

describe('LocationsViewTableControl', () => {
  beforeEach(() => {
    useControlModuleSpy.mockReturnValue([{}, jest.fn()]);
    useLocationsDataSpy.mockReturnValue([
      {
        data: { result: mockData, nextToken: undefined },
        hasError: false,
        isLoading: false,
        message: undefined,
      },
      jest.fn(),
    ]);
  });

  it('renders the table with data', () => {
    const { getByText } = render(
      <DataTableControl items={mockData} handleLocationClick={jest.fn()} />
    );

    expect(getByText('Folder')).toBeInTheDocument();
    expect(getByText('Bucket')).toBeInTheDocument();
    expect(getByText('Permission')).toBeInTheDocument();
    expect(getByText('Location A/')).toBeInTheDocument();
    expect(getByText('Folder B/')).toBeInTheDocument();
  });

  it('renders the correct icon based on sort state', () => {
    const { getByText } = render(
      <DataTableControl items={mockData} handleLocationClick={jest.fn()} />
    );

    const folderTh = screen.getByRole('columnheader', { name: 'Folder' });

    expect(folderTh).toHaveAttribute('aria-sort', 'ascending');

    fireEvent.click(getByText('Folder'));

    expect(folderTh).toHaveAttribute('aria-sort', 'descending');
  });

  it('updates sort state when other headers are clicked', () => {
    const { getByText } = render(
      <DataTableControl items={mockData} handleLocationClick={jest.fn()} />
    );

    const folderTh = screen.getByRole('columnheader', { name: 'Folder' });

    expect(folderTh).toHaveAttribute('aria-sort', 'ascending');

    const bucketTh = screen.getByRole('columnheader', { name: 'Bucket' });

    fireEvent.click(getByText('Bucket'));

    expect(bucketTh).toHaveAttribute('aria-sort', 'descending');
  });

  it('triggers location click handler when a row is clicked', () => {
    const mockHandleLocationClick = jest.fn();
    render(
      <DataTableControl
        items={mockData}
        handleLocationClick={mockHandleLocationClick}
      />
    );

    const firstRowButton = screen.getByRole('button', { name: 'Folder B/' });
    fireEvent.click(firstRowButton);

    expect(mockHandleLocationClick).toHaveBeenCalledWith(mockData[1]);
  });
});
