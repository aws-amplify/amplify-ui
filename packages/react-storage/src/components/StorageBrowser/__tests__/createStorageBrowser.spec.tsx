import React from 'react';
import { render } from '@testing-library/react';
import { createStorageBrowser } from '../createStorageBrowser';

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);

describe('createStorageBrowser', () => {
  it('returns a StorageBrowser', async () => {
    const { StorageBrowser } = createStorageBrowser({
      config: { listLocations },
    });

    expect(
      await render(<StorageBrowser />).findByText('Default behavior!')
    ).toBeDefined();
  });
});
