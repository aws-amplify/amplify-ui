import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ControlsModule from '../../../context/controls';
import createProvider from '../../../createProvider';

import { LocationActionView } from '../LocationActionView';

const TEST_ACTIONS = {
  CREATE_FOLDER: { displayName: 'Create Folder', handler: jest.fn() },
};

const INITIAL_PAGINATE_STATE = [
  { hasNext: false, hasPrevious: false, isLoadingNextPage: false, current: 0 },
  jest.fn(),
];

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');

const config = {
  getLocationCredentials: jest.fn(),
  listLocations: jest.fn(),
  region: 'region',
  registerAuthListener: jest.fn(),
};
const Provider = createProvider({ actions: TEST_ACTIONS, config });

describe('LocationActionView', () => {
  it('renders a `LocationActionView`', async () => {
    useControlSpy.mockImplementation(
      ({ type }) =>
        ({
          ACTION_SELECT: [
            {
              actions: TEST_ACTIONS,
              selected: { type: 'CREATE_FOLDER', items: undefined },
            },
            jest.fn(),
          ],
          NAVIGATE: [
            {
              location: {
                scope: 's3://test-bucket/test-prefix/*',
                permission: 'READ',
                type: 'PREFIX',
              },
              history: [{ prefix: 'test-prefix/', position: 0 }],
              path: 'test-prefix/',
            },
            jest.fn(),
          ],
          PAGINATE: INITIAL_PAGINATE_STATE,
        })[type]
    );

    await waitFor(() => {
      render(
        <Provider>
          <LocationActionView />
        </Provider>
      );
    });

    expect(screen.getByTestId('LOCATION_ACTION_VIEW')).toBeInTheDocument();
  });
});
