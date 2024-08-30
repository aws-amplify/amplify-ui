import React from 'react';
import { render } from '@testing-library/react';

import { LocationItem } from './../context/actions';
import * as ControlsModule from './../context/controls/';
import * as ActionsModule from './../context/actions';

import { Controller } from '../Controller';

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');
const useActionSpy = jest.spyOn(ActionsModule, 'useAction');

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

const INITIAL_ACTION_STATE = [
  { selected: { type: undefined, items: undefined }, actions: {} },
  jest.fn(),
];

describe('Controller', () => {
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

    render(<Controller />);

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

    render(<Controller />);

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
