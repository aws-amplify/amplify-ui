import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ControlsModule from '../../../context/control';
import createProvider from '../../../createProvider';

import { LocationActionView } from '../LocationActionView';

const TEST_ACTIONS = {
  CREATE_FOLDER: { options: { displayName: 'Create Folder' } },
  DELETE_FILE: { options: { displayName: 'Delete file' } },
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
  it('defaults to UploadControls', async () => {
    useControlSpy.mockImplementation(
      (type) =>
        ({
          LOCATION_ACTIONS: [
            {
              actions: TEST_ACTIONS,
              selected: { type: undefined, items: undefined },
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
    expect(screen.queryByText('Add files')).toBeInTheDocument();
  });

  it('renders DeleteFileControls', async () => {
    useControlSpy.mockImplementation(
      (type) =>
        ({
          LOCATION_ACTIONS: [
            {
              actions: {
                DELETE_FILE: { options: { displayName: 'Delete File' } },
              },
              selected: { type: 'DELETE_FILE', items: undefined },
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

    expect(screen.queryByText('Selected files')).toBeInTheDocument();
  });

  it('renders CreateFolderControls', async () => {
    useControlSpy.mockImplementation(
      (type) =>
        ({
          LOCATION_ACTIONS: [
            {
              actions: {
                CREATE_FOLDER: { options: { displayName: 'Create folder' } },
              },
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

    expect(screen.queryByLabelText('Enter folder name:')).toBeInTheDocument();
  });
});
