import React from 'react';
import { render } from '@testing-library/react';
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
  it('returns a StorageBrowser', () => {
    const { StorageBrowser } = createStorageBrowser({ config });

    expect(render(<StorageBrowser />).container).toBeDefined();
  });
});
