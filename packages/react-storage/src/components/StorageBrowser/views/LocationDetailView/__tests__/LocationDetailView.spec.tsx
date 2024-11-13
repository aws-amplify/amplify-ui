import React from 'react';
import { act, render } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

import * as AmplifyReactCore from '@aws-amplify/ui-react-core';

import * as StoreModule from '../../../providers/store';
import * as ConfigModule from '../../../providers/configuration';
import { LocationDetailView } from '../LocationDetailView';
import {
  DEFAULT_LIST_OPTIONS,
  DEFAULT_ERROR_MESSAGE,
} from '../LocationDetailView';
import {
  ActionInputConfig,
  ListLocationItemsHandlerOutput,
} from '../../../actions';
import { useProcessTasks } from '../../../tasks/useProcessTasks';
import { INITIAL_STATUS_COUNTS } from '../../../tasks';

jest.mock('../Controls/ActionsMenu');
jest.mock('../../../displayText', () => ({
  useDisplayText: () => ({ LocationDetailView: { title: jest.fn() } }),
}));
jest.mock('../../../providers/configuration');
jest.mock('../../../controls/NavigationControl', () => ({
  NavigationControl: () => 'NavigationControl',
}));
jest.mock('../../../controls/DataTableControl', () => ({
  DataTableControl: () => <div data-testid="data-table-control" />,
}));
jest.mock('../../../tasks/useProcessTasks');

const handleList = jest.fn();

const prefix = 'b_prefix/';
const getFolderPrefix = (index: number) => `a_prefix_${index}`;
const testFolder = { type: 'FOLDER', id: 'folder-01', key: 'a_prefix_test/' };

let uuid = 0;
const generateMockItems = (
  size: number
): ListLocationItemsHandlerOutput['items'] => {
  return Array.apply(0, new Array(size)).map((_, index) => {
    const type = index % 2 == 0 ? 'FILE' : 'FOLDER';
    uuid++;
    const id = uuid.toString();
    return type === 'FOLDER'
      ? { key: getFolderPrefix(index), id, type: 'FOLDER' }
      : {
          key: `${prefix}key${index}`,
          type: 'FILE',
          id,
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
  jest.spyOn(AmplifyReactCore, 'useDataState').mockReturnValue([
    {
      data: { items: result, nextToken },
      hasError,
      isLoading,
      message,
    },
    handleList,
  ]);
};

const dispatchStoreAction = jest.fn();
const useStoreSpy = jest.spyOn(StoreModule, 'useStore');

const location = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permission: 'READWRITE',
  prefix: 'test-prefix/',
  type: 'PREFIX',
};
const useGetActionSpy = jest.spyOn(ConfigModule, 'useGetActionInput');
const config: ActionInputConfig = {
  bucket: 'bucky',
  credentials: jest.fn(),
  region: 'us-weast-1',
};
useGetActionSpy.mockReturnValue(() => config);

describe('LocationDetailView', () => {
  let user: UserEvent;

  const mockUseProcessTasks = jest.mocked(useProcessTasks);

  beforeAll(() => {
    mockUseProcessTasks.mockReturnValue([
      {
        isProcessing: false,
        isProcessingComplete: false,
        statusCounts: INITIAL_STATUS_COUNTS,
        tasks: [],
      },
      jest.fn(),
    ]);
  });

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    uuid = 0;
    jest.clearAllMocks();
  });

  it('shows a Loading element when first loaded', () => {
    useStoreSpy.mockReturnValueOnce([
      {
        location: { current: location, path: '', key: location.prefix },
        locationItems: { fileDataItems: undefined },
      } as StoreModule.UseStoreState,
      dispatchStoreAction,
    ]);
    mockListItemsAction({ isLoading: true, result: [] });

    const { getByText } = render(<LocationDetailView />);

    const text = getByText('Loading');

    expect(text).toBeInTheDocument();
  });

  it('renders correct error state', () => {
    const errorMessage = 'A network error occurred.';

    mockListItemsAction({
      isLoading: false,
      hasError: true,
      message: errorMessage,
      result: [{ key: 'test1', type: 'FOLDER' }],
      nextToken: 'some-token',
    });

    const { getByRole, queryByTestId } = render(<LocationDetailView />);

    const message = getByRole('alert');
    expect(message).toBeInTheDocument();

    // table doesn't render
    const table = queryByTestId('LOCATION_DETAIL_VIEW_TABLE');
    expect(table).not.toBeInTheDocument();
  });

  it('renders a default error Message', () => {
    mockListItemsAction({ result: [], hasError: true, message: undefined });

    const { getByText } = render(<LocationDetailView />);

    const messageText = getByText(DEFAULT_ERROR_MESSAGE);
    expect(messageText).toBeInTheDocument();
  });

  it('allows searching for items', async () => {
    useStoreSpy.mockReturnValue([
      {
        location: { current: location, path: '', key: location.prefix },
        locationItems: { fileDataItems: undefined },
      } as StoreModule.UseStoreState,
      dispatchStoreAction,
    ]);
    mockListItemsAction({ result: testResult });

    const { getByPlaceholderText, getByText, getByLabelText } = render(
      <LocationDetailView />
    );

    const input = getByPlaceholderText('Search current folder');
    const subfolderOption = getByText('Include subfolders');

    expect(input).toBeInTheDocument();
    expect(subfolderOption).toBeInTheDocument();

    input.focus();
    await act(async () => {
      await user.keyboard('boo');
      await user.click(subfolderOption);
      await user.click(getByText('Submit'));
    });

    expect(input).toHaveValue('boo');

    // search initiated
    expect(handleList).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          search: {
            filterKey: 'key',
            query: 'boo',
          },
        }),
      })
    );

    // refresh
    await act(async () => {
      await user.click(getByLabelText('Refresh data'));
    });

    // clears search
    expect(input).toHaveValue('');
  });

  it('loads initial location items for a BUCKET location as expected', () => {
    useStoreSpy.mockReturnValueOnce([
      {
        location: { current: location, path: '', key: location.prefix },
        locationItems: { fileDataItems: undefined },
      } as StoreModule.UseStoreState,
      dispatchStoreAction,
    ]);

    mockListItemsAction({
      isLoading: false,
      hasError: false,
      result: [{ key: 'test1', type: 'FOLDER' }],
      nextToken: 'some-token',
    });

    const { getByTestId } = render(<LocationDetailView />);

    expect(getByTestId('data-table-control')).toBeInTheDocument();
    expect(handleList).toHaveBeenCalledTimes(1);
    expect(handleList).toHaveBeenCalledWith({
      config,
      prefix: location.prefix,
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
  });

  it('refreshes table and clears selection state when refresh button is clicked', async () => {
    useStoreSpy.mockReturnValue([
      {
        location: { current: location, path: '', key: location.prefix },
        locationItems: { fileDataItems: undefined },
      } as StoreModule.UseStoreState,
      dispatchStoreAction,
    ]);

    mockListItemsAction({ result: testResult });

    const { getByLabelText } = render(<LocationDetailView />);

    const refreshButton = getByLabelText('Refresh data');

    await act(async () => {
      await user.click(refreshButton);
    });

    expect(handleList).toHaveBeenCalledWith({
      config,
      prefix: location.prefix,
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });

    expect(dispatchStoreAction).toHaveBeenLastCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
  });
});
