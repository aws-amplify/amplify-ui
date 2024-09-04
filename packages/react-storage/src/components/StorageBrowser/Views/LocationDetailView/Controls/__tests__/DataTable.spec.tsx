import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import createProvider from '../../../../createProvider';
import * as UseControlModule from '../../../../context/controls';
import * as UseActionModule from '../../../../context/actions';

import { DataTableControl } from '../DataTable';

const TEST_RANGE: [number, number] = [0, 100];

const useControlModuleSpy = jest.spyOn(UseControlModule, 'useControl');
const useActionModuleSpy = jest.spyOn(UseActionModule, 'useAction');

const config = {
  getLocationCredentials: jest.fn(),
  listLocations: jest.fn(),
  region: 'region',
  registerAuthListener: jest.fn(),
};
const Provider = createProvider({ actions: {}, config });

const INITIAL_ACTION_SELECT_STATE = [
  {
    actions: {},
    selected: { type: undefined, items: undefined },
  },
  jest.fn(),
];

const INITIAL_PAGINATE_STATE = [
  {
    hasNext: false,
    hasPrevious: false,
    isLoadingNextPage: false,
    current: 0,
  },
  jest.fn(),
];

const INITIAL_NAVIGATE_STATE = [
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
];

describe('Location Detail View DataTable', () => {
  beforeEach(() => {
    useControlModuleSpy.mockImplementation(
      ({ type }) =>
        ({
          ACTION_SELECT: INITIAL_ACTION_SELECT_STATE,
          NAVIGATE: INITIAL_NAVIGATE_STATE,
          PAGINATE: INITIAL_PAGINATE_STATE,
        })[type]
    );

    useActionModuleSpy.mockReturnValue([
      {
        data: {
          result: [
            {
              key: 'test1',
              lastModified: new Date(),
              size: 100,
              type: 'FILE',
            },
            {
              key: 'watermelon/',
              type: 'FOLDER',
            },
          ],
          nextToken: undefined,
        },
        hasError: false,
        isLoading: false,
        message: '',
      },
      jest.fn(),
    ]);
  });

  it('renders the table with data', () => {
    const { getByText } = render(
      <Provider>
        <DataTableControl range={TEST_RANGE} />
      </Provider>
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Last Modified')).toBeInTheDocument();
    expect(getByText('Size')).toBeInTheDocument();
  });

  it('renders the correct icon based on sort state', () => {
    const { getByText } = render(
      <Provider>
        <DataTableControl range={TEST_RANGE} />
      </Provider>
    );

    // sort name
    const nameTh = screen.getByRole('columnheader', { name: 'Name' });
    expect(nameTh).toHaveAttribute('aria-sort', 'ascending');
    fireEvent.click(getByText('Name'));
    expect(nameTh).toHaveAttribute('aria-sort', 'descending');

    // sort type
    const typeTh = screen.getByRole('columnheader', { name: 'Type' });
    fireEvent.click(getByText('Type'));
    expect(typeTh).toHaveAttribute('aria-sort', 'ascending');

    // sort last modified
    const lastModifiedTh = screen.getByRole('columnheader', {
      name: 'Last Modified',
    });
    fireEvent.click(getByText('Last Modified'));
    expect(lastModifiedTh).toHaveAttribute('aria-sort', 'descending');

    // sort size
    const sizeTh = screen.getByRole('columnheader', { name: 'Size' });
    fireEvent.click(getByText('Size'));
    expect(sizeTh).toHaveAttribute('aria-sort', 'ascending');
  });

  it('triggers location click handler when a row is clicked', () => {
    const mockHandleUpdateState = jest.fn();
    useControlModuleSpy.mockImplementation(
      ({ type }) =>
        ({
          ACTION_SELECT: INITIAL_ACTION_SELECT_STATE,
          NAVIGATE: [INITIAL_NAVIGATE_STATE[0], mockHandleUpdateState],
          PAGINATE: INITIAL_PAGINATE_STATE,
        })[type]
    );

    render(
      <Provider>
        <DataTableControl range={TEST_RANGE} />
      </Provider>
    );

    const folderButton = screen.getByRole('button', { name: 'watermelon/' });
    fireEvent.click(folderButton);

    expect(mockHandleUpdateState).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      entry: {
        position: 2, // history.length + 1
        prefix: 'watermelon/',
      },
    });
  });
});
