import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ControlsModule from '../context/controls';
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

  it('renders ActionView on action select', async () => {
    const { StorageBrowser } = createStorageBrowser({ config });

    // Used 'mockReturnValueOnce` three times to mock each time it's called
    // to render LocationActionView
    // Twice in `DefaultStorageBrowser` and then once in `LocationActionView`
    jest
      .spyOn(controlsModule, 'useControl')
      .mockReturnValueOnce([{ location: {} }])
      .mockReturnValueOnce([{ selected: { actionType: 'CREATE_FOLDER' } }])
      .mockReturnValueOnce([{ selected: { actionType: 'CREATE_FOLDER' } }]);

    await waitFor(() => {
      render(<StorageBrowser />);
    });

    expect(screen.getByText('CREATE_FOLDER')).toBeInTheDocument();
  });
});
