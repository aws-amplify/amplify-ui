import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { createStorageBrowser } from '../createStorageBrowser';

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);
const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
};

describe('createStorageBrowser', () => {
  it('returns a StorageBrowser', async () => {
    const { StorageBrowser } = createStorageBrowser({ config });

    await waitFor(() => {
      expect(render(<StorageBrowser />).container).toBeDefined();
    });
  });
});
