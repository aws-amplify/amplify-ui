import React from 'react';
import { render, waitFor } from '@testing-library/react';

import * as ControlsModule from '../../../context/controls';
import createProvider from '../../../createProvider';
import { ActionSelectState } from '../../../context/controls/ActionSelect/ActionSelect';

import { LocationActionView } from '../LocationActionView';

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);
const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
  registerAuthListener: jest.fn(),
};
const Provider = createProvider({ config });

const actionSelectState: ActionSelectState = {
  actions: [],
  selected: {
    items: [],
    actionType: undefined,
    destination: undefined,
    name: undefined,
  },
};

const navigateState = {
  location: {
    permission: 'READWRITE',
    scope: 's3://test-bucket/*',
    type: 'BUCKET',
  },
  path: 'path',
  history: [
    { prefix: '', position: 0 },
    { prefix: 'folder1/', position: 1 },
    { prefix: 'folder2/', position: 2 },
    { prefix: 'folder3/', position: 3 },
  ],
};

useControlSpy.mockImplementation((obj) => {
  const { type } = obj;

  if (type === 'ACTION_SELECT') {
    return [actionSelectState, jest.fn()];
  }

  if (type === 'NAVIGATE') {
    return [navigateState];
  }
});

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
