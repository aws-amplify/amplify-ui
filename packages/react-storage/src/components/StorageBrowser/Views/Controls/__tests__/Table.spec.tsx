import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { LocationsViewTable } from '../Table';
import createProvider from '../../../createProvider';

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);

const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
};

const Provider = createProvider({ config });

describe('TableControl', () => {
  it('renders a Locations View table', () => {
    waitFor(() =>
      expect(
        render(
          <Provider>
            <LocationsViewTable />
          </Provider>
        ).container
      ).toBeDefined()
    );
  });
});
