import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import * as UseLocationsDataModule from '../../../../context/actions';
import * as UseControlModule from '../../../../context/control';
import { LocationAccess } from '../../../../context/types';

import { DataTableControl } from '../DataTable';

const TEST_RANGE: [number, number] = [0, 100];

const useControlModuleSpy = jest.spyOn(UseControlModule, 'useControl');
const useLocationsDataSpy = jest.spyOn(
  UseLocationsDataModule,
  'useLocationsData'
);

const mockData: LocationAccess<UseLocationsDataModule.Permission>[] = [
  { scope: 'Location A', type: 'BUCKET', permission: 'READ' },
  { scope: 'Location B', type: 'PREFIX', permission: 'WRITE' },
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
      <DataTableControl items={mockData} handleLocationClick={() => {}} />
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Type')).toBeInTheDocument();
    expect(getByText('Permission')).toBeInTheDocument();
    expect(getByText('Location A')).toBeInTheDocument();
    expect(getByText('Location B')).toBeInTheDocument();
  });

  it('renders the correct icon based on sort state', () => {
    const { getByText } = render(
      <DataTableControl items={mockData} handleLocationClick={() => {}} />
    );

    const nameTh = screen.getByRole('columnheader', { name: 'Name' });

    expect(nameTh).toHaveAttribute('aria-sort', 'ascending');

    fireEvent.click(getByText('Name'));

    expect(nameTh).toHaveAttribute('aria-sort', 'descending');
  });

  it('triggers location click handler when a row is clicked', () => {
    const mockHandleLocationClick = jest.fn();

    render(
      <DataTableControl
        items={mockData}
        handleLocationClick={mockHandleLocationClick}
      />
    );

    const firstRowButton = screen.getByRole('button', { name: 'Location A' });
    fireEvent.click(firstRowButton);

    expect(mockHandleLocationClick).toHaveBeenCalledWith(mockData[0]);
  });
});
