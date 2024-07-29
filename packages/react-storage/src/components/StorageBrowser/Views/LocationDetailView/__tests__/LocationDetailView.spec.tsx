import React from 'react';
import { render, waitFor } from '@testing-library/react';

import createProvider from '../../../createProvider';

import { LocationDetailView } from '../LocationDetailView';

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);
const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
};
const Provider = createProvider({ config });

describe('LocationDetailView', () => {
  it('renders a `LocationDetailView`', async () => {
    await waitFor(() => {
      expect(
        render(
          <Provider>
            <LocationDetailView />
          </Provider>
        ).container
      ).toBeDefined();
    });
  });
});
