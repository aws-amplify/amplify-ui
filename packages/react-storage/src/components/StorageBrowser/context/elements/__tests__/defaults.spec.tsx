import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { createStorageBrowser } from '../../../createStorageBrowser';
import { elementsDefault } from '../defaults';

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);
const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
  registerAuthListener: jest.fn(),
};

describe('defaultElements', () => {
  it('renders the elementsDefault when used', async () => {
    const { StorageBrowser } = createStorageBrowser({
      elements: elementsDefault,
      config,
    });

    render(<StorageBrowser />);
    await waitFor(() => {
      const title = screen.getByRole('heading', { name: 'Home' });

      expect(title.classList).toContain('amplify-heading');
    });
  });
});
