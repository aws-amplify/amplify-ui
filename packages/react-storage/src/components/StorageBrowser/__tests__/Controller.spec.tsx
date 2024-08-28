import React from 'react';
import { render } from '@testing-library/react';

import { LocationItem } from './../context/actions';
import * as ControlsModule from './../context/controls/';
import * as ActionsModule from './../context/actions';
import createProvider from '../createProvider';

const useLocationsDataSpy = jest.spyOn(ActionsModule, 'useLocationsData');
const useControlSpy = jest.spyOn(ControlsModule, 'useControl');
const useActionSpy = jest.spyOn(ActionsModule, 'useAction');

const handleListLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);

const config = {
  getLocationCredentials: jest.fn(),
  listLocations: handleListLocations,
  region: 'region',
  registerAuthListener: jest.fn(),
};

const Provider = createProvider({ actions: {}, config });

const initialState: ActionsModule.LocationsDataState = [
  {
    data: { result: [], nextToken: undefined },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleListLocations,
];
const loadingState: ActionsModule.LocationsDataState = [
  {
    data: { result: [], nextToken: undefined },
    hasError: false,
    isLoading: true,
    message: undefined,
  },
  handleListLocations,
];
const resolvedState: ActionsModule.LocationsDataState = [
  {
    data: {
      result: [
        {
          permission: 'READWRITE',
          scope: 's3://test-bucket/*',
          type: 'BUCKET',
        },
      ],
      nextToken: undefined,
    },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleListLocations,
];

const locationItems: LocationItem[] = [
  {
    key: 'test-key-1',
    lastModified: new Date(),
    size: 1000,
    type: 'FILE',
  },
];

const locationItemsState = {
  data: { result: locationItems, nextToken: undefined },
  hasError: false,
  isLoading: false,
  message: undefined,
};

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
  { location: undefined, history: [], path: '' },
  jest.fn(),
];
const INITIAL_ACTION_STATE = [
  { selected: { type: undefined, items: undefined }, actions: {} },
  jest.fn(),
];

describe('Controller', () => {
  beforeEach(() => {
    useControlSpy.mockImplementation(
      ({ type }) =>
        ({
          ACTION_SELECT: INITIAL_ACTION_STATE,
          NAVIGATE: INITIAL_NAVIGATE_STATE,
          PAGINATE: INITIAL_PAGINATE_STATE,
        })[type]
    );

    handleListLocations.mockClear();
    useLocationsDataSpy.mockClear();
  });

  it('behaves as expected on initial render', () => {
    useLocationsDataSpy
      .mockReturnValueOnce(initialState)
      .mockReturnValueOnce(loadingState)
      .mockReturnValue(resolvedState);

    const { rerender } = render(<Provider />);

    expect(useLocationsDataSpy).toHaveBeenCalledTimes(1);
    expect(useLocationsDataSpy).toHaveBeenCalledTimes(1);
    expect(handleListLocations).toHaveBeenCalledTimes(1);

    rerender(<Provider />);

    expect(useLocationsDataSpy).toHaveBeenCalledTimes(2);
    expect(handleListLocations).toHaveBeenCalledTimes(1);

    rerender(<Provider />);

    expect(useLocationsDataSpy).toHaveBeenCalledTimes(3);
    expect(handleListLocations).toHaveBeenCalledTimes(1);
  });

  it.todo('handles failure from locations loading as expected');

  it.todo('handles empty locations result data as expected');

  it('refreshes locations on handleListLocations reference change', () => {
    const updatedHandleListLocations = jest.fn();

    useLocationsDataSpy
      .mockReturnValueOnce(initialState)
      .mockReturnValueOnce(loadingState)
      .mockReturnValueOnce(resolvedState)
      .mockReturnValue([{ ...resolvedState[0] }, updatedHandleListLocations]);

    // initial
    const { rerender } = render(<Provider />);

    // loading
    rerender(<Provider />);
    // resolved
    rerender(<Provider />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(handleListLocations).toHaveBeenCalledWith({
      options: { pageSize: 1000, refresh: true },
    });
    expect(updatedHandleListLocations).not.toHaveBeenCalled();

    // reference change
    rerender(<Provider />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(updatedHandleListLocations).toHaveBeenCalledTimes(1);
    expect(updatedHandleListLocations).toHaveBeenCalledWith({
      options: { pageSize: 1000, refresh: true },
    });
  });

  it('loads initial location items for a BUCKET location as expected', () => {
    const handleUpdateActionState = jest.fn();
    useActionSpy.mockReturnValue([locationItemsState, handleUpdateActionState]);

    useControlSpy.mockImplementation(
      ({ type }) =>
        ({
          ACTION_SELECT: INITIAL_ACTION_STATE,
          NAVIGATE: [
            {
              location: {
                scope: 's3://test-bucket/*',
                permission: 'READ',
                type: 'BUCKET',
              },
              history: [{ prefix: '', position: 0 }],
              path: '',
            },
            jest.fn(),
          ],
          PAGINATE: INITIAL_PAGINATE_STATE,
        })[type]
    );

    render(<Provider />);

    expect(handleUpdateActionState).toHaveBeenCalledTimes(1);
    expect(handleUpdateActionState).toHaveBeenCalledWith({
      prefix: '',
      options: { delimiter: '/', pageSize: 1000, refresh: true },
    });
  });

  it('loads initial location items for a PREFIX location as expected', () => {
    const handleUpdateActionState = jest.fn();
    useActionSpy.mockReturnValue([locationItemsState, handleUpdateActionState]);

    useControlSpy.mockImplementation(
      ({ type }) =>
        ({
          ACTION_SELECT: INITIAL_ACTION_STATE,
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

    render(<Provider />);

    expect(handleUpdateActionState).toHaveBeenCalledTimes(1);
    expect(handleUpdateActionState).toHaveBeenCalledWith({
      prefix: 'test-prefix/',
      options: {
        delimiter: '/',
        pageSize: 1000,
        refresh: true,
      },
    });
  });
});
