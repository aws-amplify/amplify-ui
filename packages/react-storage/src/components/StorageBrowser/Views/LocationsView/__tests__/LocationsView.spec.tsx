import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import createProvider from '../../../createProvider';
import * as ActionsModule from '../../../context/actions';

import { LocationsView } from '..';

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

const useLocationsDataSpy = jest.spyOn(ActionsModule, 'useLocationsData');

const handleListLocations = jest.fn();

describe('LocationsListView', () => {
  beforeEach(() => {
    handleListLocations.mockClear();
    useLocationsDataSpy.mockClear();
  });

  it('renders a `LocationsListView`', async () => {
    await waitFor(() => {
      expect(
        render(
          <Provider>
            <LocationsView />
          </Provider>
        ).container
      ).toBeDefined();
    });
  });

  it('renders a Locations View table', () => {
    useLocationsDataSpy.mockReturnValue([
      {
        data: {
          result: [
            {
              permission: 'READWRITE',
              scope: 's3://test-bucket/*',
              type: 'BUCKET',
            },
          ],
          nextToken: undefined,
        },
        hasError: false,
        isLoading: false,
        message: undefined,
      },
      handleListLocations,
    ]);

    render(
      <Provider>
        <LocationsView />
      </Provider>
    );

    const table = screen.getByRole('table');

    expect(table).toBeDefined();
  });
});
