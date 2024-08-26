import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { DataTableControl } from '../DataTable';
import * as UseControlModule from '../../../../context/controls';
import * as UseLocationsDataModule from '../../../../context/actions';
import createProvider from '../../../../createProvider';
import { LocationAccess } from '../../../../context/types';

const useControlModuleSpy = jest.spyOn(UseControlModule, 'useControl');
const useLocationsDataSpy = jest.spyOn(
  UseLocationsDataModule,
  'useLocationsData'
);

const mockData: LocationAccess<UseLocationsDataModule.Permission>[] = [
  { scope: 'Location A', type: 'BUCKET', permission: 'READ' },
  { scope: 'Location B', type: 'PREFIX', permission: 'WRITE' },
];

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);

const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
  registerAuthListener: jest.fn(),
};

const Provider = createProvider({ actions: {}, config });

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
      <Provider>
        <DataTableControl />
      </Provider>
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Type')).toBeInTheDocument();
    expect(getByText('Permission')).toBeInTheDocument();
    expect(getByText('Location A')).toBeInTheDocument();
    expect(getByText('Location B')).toBeInTheDocument();
  });

  it('renders the correct icon based on sort state', () => {
    const { getByText } = render(
      <Provider>
        <DataTableControl />
      </Provider>
    );

    const nameTh = screen.getByRole('columnheader', { name: 'Name' });

    expect(nameTh).toHaveAttribute('aria-sort', 'ascending');

    fireEvent.click(getByText('Name'));

    expect(nameTh).toHaveAttribute('aria-sort', 'descending');
  });

  it('triggers location click handler when a row is clicked', () => {
    const mockHandleUpdateState = jest.fn();
    useControlModuleSpy.mockReturnValue([{}, mockHandleUpdateState]);

    render(
      <Provider>
        <DataTableControl />
      </Provider>
    );

    const firstRowButton = screen.getByRole('button', { name: 'Location A' });
    fireEvent.click(firstRowButton);

    expect(mockHandleUpdateState).toHaveBeenCalledWith({
      type: 'ACCESS_LOCATION',
      location: mockData[0],
    });
  });
});
