import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ControlsModule from '../../../context/control';
import createProvider from '../../../do-not-import-from-here/createTempActionsProvider';

import { LocationActionView } from '../LocationActionView';

const TEST_ACTIONS = {
  CREATE_FOLDER: { options: { displayName: 'Create Folder' } },
};

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
      (type) =>
        ({
          LOCATION_ACTIONS: [
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
