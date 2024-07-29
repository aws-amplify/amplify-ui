import React from 'react';
import { render, waitFor } from '@testing-library/react';
import createProvider from '../../../createProvider';

import { LocationActionView } from '../LocationActionView';

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);
const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
};
const Provider = createProvider({ config });

describe('ActionView', () => {
  it('renders a `ActionView`', async () => {
    await waitFor(() => {
      expect(
        render(
          <Provider>
            <LocationActionView />
          </Provider>
        ).container
      ).toBeDefined();
    });
  });
});
