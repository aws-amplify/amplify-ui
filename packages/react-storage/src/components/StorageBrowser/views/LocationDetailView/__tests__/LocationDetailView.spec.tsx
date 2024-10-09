import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import createProvider from '../../../createProvider';
import * as ActionsModule from '../../../context/actions';
import * as ControlsModule from '../../../context/control';

import { LocationDetailView } from '../LocationDetailView';
import { DEFAULT_LIST_OPTIONS, DEFAULT_ERROR_MESSAGE } from '../Controls';

const config = {
  getLocationCredentials: jest.fn(),
  listLocations: jest.fn(),
  region: 'region',
  registerAuthListener: jest.fn(),
};

const Provider = createProvider({ actions: {}, config });

const handleList = jest.fn();
const handleUpdateState = jest.fn();

jest.spyOn(ActionsModule, 'useAction').mockReturnValue([
  {
    data: {
      result: [{ key: 'test1', type: 'FOLDER' }],
      nextToken: undefined,
    },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleList,
]);

jest.spyOn(ControlsModule, 'useControl').mockImplementation(
  (type) =>
    ({
      LOCATION_ACTIONS: [
        {
          actions: {},
          selected: { type: undefined, items: undefined },
        },
        handleUpdateState,
      ],
      NAVIGATE: [
        {
          location: {
            scope: 's3://test-bucket/*',
            permission: 'READ',
            type: 'BUCKET',
          },
          history: [{ prefix: 'cat-cat/' }],
          path: 'cat-cat/',
        },
        jest.fn(),
      ],
    })[type]
);

describe('LocationDetailView', () => {
  it('renders a `LocationDetailView`', async () => {
    await waitFor(() => {
      render(
        <Provider>
          <LocationDetailView />
        </Provider>
      );
    });

    expect(screen.getByTestId('LOCATION_DETAIL_VIEW')).toBeInTheDocument();
  });

  it('refreshes table when refresh button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    const refreshButton = screen.getByLabelText('Refresh table');

    await act(async () => {
      await user.click(refreshButton);
    });

    expect(handleList).toHaveBeenCalledWith({
      prefix: 'cat-cat/',
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
  });

  it('shows a Loading element when first loaded', () => {
    jest.spyOn(ActionsModule, 'useAction').mockReturnValue([
      {
        data: {
          result: [],
          nextToken: undefined,
        },
        hasError: false,
        isLoading: true,
        message: undefined,
      },
      handleList,
    ]);

    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    const text = screen.getByText('Loading');

    expect(text).toBeInTheDocument();
  });

  it('renders a returned error Message', () => {
    const errorMessage = 'A network error occurred.';

    jest.spyOn(ActionsModule, 'useAction').mockReturnValue([
      {
        data: {
          result: [],
          nextToken: undefined,
        },
        hasError: true,
        isLoading: true,
        message: errorMessage,
      },
      handleList,
    ]);

    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    const message = screen.getByRole('alert');
    const messageText = screen.getByText(errorMessage);

    expect(message).toBeInTheDocument();
    expect(messageText).toBeInTheDocument();
  });

  it('renders a default error Message', () => {
    jest.spyOn(ActionsModule, 'useAction').mockReturnValue([
      {
        data: {
          result: [],
          nextToken: undefined,
        },
        hasError: true,
        isLoading: true,
        message: undefined,
      },
      handleList,
    ]);

    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    const messageText = screen.getByText(DEFAULT_ERROR_MESSAGE);
    expect(messageText).toBeInTheDocument();
  });

  it('loads initial location items for a BUCKET location as expected', () => {
    jest.spyOn(ControlsModule, 'useControl').mockImplementation(
      (type) =>
        ({
          LOCATION_ACTIONS: [
            {
              actions: {},
              selected: { type: undefined, items: undefined },
            },
            jest.fn(),
          ],
          NAVIGATE: [
            {
              location: {
                scope: 's3://test-bucket/*',
                permission: 'READ',
                type: 'BUCKET',
              },
              history: [{ prefix: '' }],
              path: '',
            },
            jest.fn(),
          ],
        })[type]
    );

    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    expect(handleList).toHaveBeenCalled();
    expect(handleList).toHaveBeenCalledWith({
      prefix: '',
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
  });

  it('sets the location action as UPLOAD_FILES and includes files dragged into drop zone', () => {
    const files = [new File(['content'], 'file.txt', { type: 'text/plain' })];

    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    const dropzone = screen.getByTestId('dropzone');

    jest.spyOn(ControlsModule, 'ControlProvider');

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files,
      },
    });

    expect(handleUpdateState).toHaveBeenCalledWith({
      type: 'UPLOAD_FILES',
      items: files,
    });
  });
});
