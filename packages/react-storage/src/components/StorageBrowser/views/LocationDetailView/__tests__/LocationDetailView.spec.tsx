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
import { ListLocationItemsActionOutput } from '../../../actions';

const config = {
  getLocationCredentials: jest.fn(),
  listLocations: jest.fn(),
  region: 'region',
  registerAuthListener: jest.fn(),
};

const Provider = createProvider({ actions: {}, config });

const handleList = jest.fn();
const handleLocationActionsState = jest.fn();
const handleUpdateState = jest.fn();

const prefix = 'b_prefix/';
const getFolderPrefix = (index: number) => `a_prefix_${index}`;
const testFolder = { type: 'FOLDER', key: 'a_prefix_test/' };

const generateMockItems = (
  size: number
): ListLocationItemsActionOutput['items'] => {
  return Array.apply(0, new Array(size)).map((_, index) => {
    const type = index % 2 == 0 ? 'FILE' : 'FOLDER';
    return type === 'FOLDER'
      ? {
          key: getFolderPrefix(index),
          type: 'FOLDER',
        }
      : {
          key: `${prefix}key${index}`,
          type: 'FILE',
          lastModified: new Date(),
          size: Math.floor(Math.random() * 1000000),
        };
  });
};

const testResult = [testFolder, ...generateMockItems(200)];

const mockListItemsAction = ({
  hasError = false,
  isLoading = false,
  message,
  result,
  nextToken = undefined,
}: {
  hasError?: boolean;
  isLoading?: boolean;
  message?: string;
  result: any[];
  nextToken?: string;
}) => {
  jest.spyOn(ActionsModule, 'useAction').mockReturnValue([
    {
      data: {
        result,
        nextToken,
      },
      hasError,
      isLoading,
      message,
    },
    handleList,
  ]);
};

const mockUseControl = ({ prefix = '' }: { prefix: string }) => {
  jest.spyOn(ControlsModule, 'useControl').mockImplementation(
    (type) =>
      ({
        LOCATION_ACTIONS: [
          {
            actions: {},
            selected: { type: undefined, items: [] },
          },
          handleLocationActionsState,
        ],
        NAVIGATE: [
          {
            location: {
              scope: 's3://test-bucket/*',
              permission: 'READ',
              type: 'BUCKET',
            },
            history: prefix ? [{ prefix }] : [],
            path: prefix,
          },
          handleUpdateState,
        ],
      })[type]
  );
};

describe('LocationDetailView', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('renders a `LocationDetailView`', async () => {
    mockListItemsAction({ result: testResult });
    mockUseControl({ prefix });

    await waitFor(() => {
      render(
        <Provider>
          <LocationDetailView />
        </Provider>
      );
    });

    expect(screen.getByTestId('LOCATION_DETAIL_VIEW')).toBeInTheDocument();
  });

  it('shows a Loading element when first loaded', () => {
    mockListItemsAction({ isLoading: true, result: [] });

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

    mockListItemsAction({
      isLoading: true,
      hasError: true,
      message: errorMessage,
      result: [],
    });

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
    mockListItemsAction({ result: [], hasError: true, message: undefined });

    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    const messageText = screen.getByText(DEFAULT_ERROR_MESSAGE);
    expect(messageText).toBeInTheDocument();
  });

  it('loads initial location items for a BUCKET location as expected', () => {
    const initialPrefix = '';
    mockUseControl({ prefix: initialPrefix });
    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    expect(handleList).toHaveBeenCalled();
    expect(handleList).toHaveBeenCalledWith({
      prefix: initialPrefix,
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
  });

  it('refreshes table and clears selection state when refresh button is clicked', async () => {
    const user = userEvent.setup();
    mockUseControl({ prefix: prefix });
    mockListItemsAction({ result: testResult });

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
      prefix: prefix,
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
  });

  it('sets the location action as UPLOAD_FILES and includes files dragged into drop zone', () => {
    mockUseControl({ prefix: prefix });
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

    expect(handleLocationActionsState).toHaveBeenCalledWith({
      payload: 'UPLOAD_FILES',
      type: 'SET_ACTION',
      files: files,
    });
  });
});
