import React from 'react';
import { render, waitFor } from '@testing-library/react';

import createProvider from '../../../createProvider';

import { LocationsView } from '..';

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);
const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
};
const Provider = createProvider({ config });

describe('LocationsListView', () => {
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
});
