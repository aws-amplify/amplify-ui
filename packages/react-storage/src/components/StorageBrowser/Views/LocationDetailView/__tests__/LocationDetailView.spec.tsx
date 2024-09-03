import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import createProvider from '../../../createProvider';
import * as ActionsModule from '../../../context/actions';
import * as ControlsModule from '../../../context/controls';

import { LocationDetailView } from '../LocationDetailView';
import { DEFAULT_LIST_OPTIONS, DEFAULT_ERROR_MESSAGE } from '../Controls';

const INITIAL_PAGINATE_STATE = [
  {
    hasNext: false,
    hasPrevious: false,
    isLoadingNextPage: false,
    current: 0,
  },
  jest.fn(),
];

const config = {
  getLocationCredentials: jest.fn(),
  listLocations: jest.fn(),
  region: 'region',
  registerAuthListener: jest.fn(),
};

const Provider = createProvider({ actions: {}, config });

const handleList = jest.fn();

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
  ({ type }) =>
    ({
      ACTION_SELECT: [
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
          history: [{ prefix: 'cat-cat/' }],
          path: 'cat-cat/',
        },
        jest.fn(),
      ],
      PAGINATE: INITIAL_PAGINATE_STATE,
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
      ({ type }) =>
        ({
          ACTION_SELECT: [
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
          PAGINATE: INITIAL_PAGINATE_STATE,
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
});
