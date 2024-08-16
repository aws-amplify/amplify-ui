import React from 'react';
import { render, waitFor } from '@testing-library/react';

import createProvider from '../../../createProvider';
import * as ControlsModule from '../../../context/controls/';
import * as ActionsModule from '../../../context/actions';
import { LocationItem } from '../../../context/actions';

import { LocationDetailViewTable, LocationsViewTable } from '../Table';

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');
const useActionSpy = jest.spyOn(ActionsModule, 'useAction');

const handleUpdateControlState = jest.fn();
const controlState = {
  location: {
    scope: 's3://test-bucket/*',
    permission: 'READ',
    type: 'BUCKET',
  },
  history: [''],
};

const locationItems: LocationItem[] = [
  {
    key: 'test-key-1',
    lastModified: new Date(),
    size: 1000,
    type: 'FILE',
  },
  {
    key: 'test-key-2',
    lastModified: new Date(),
    size: 1000,
    type: 'FILE',
  },
  {
    key: 'test-key-3',
    lastModified: new Date(),
    size: 1000,
    type: 'FILE',
  },
  {
    key: 'test-folder-key-1',
    type: 'FOLDER',
  },
];

const locationItemsState = {
  data: { result: locationItems, nextToken: undefined },
  hasError: false,
  isLoading: false,
  message: undefined,
};
const handleUpdateActionState = jest.fn();

useActionSpy.mockReturnValue([locationItemsState, handleUpdateActionState]);

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);

const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
  registerAuthListener: jest.fn(),
};

const Provider = createProvider({ config });

describe('TableControl', () => {
  beforeEach(() => {
    useActionSpy.mockClear();
    useControlSpy.mockClear();

    handleUpdateActionState.mockClear();
    handleUpdateControlState.mockClear();
  });

  it('renders a Locations View table', async () => {
    await waitFor(() =>
      expect(
        render(
          <Provider>
            <LocationsViewTable />
          </Provider>
        ).container
      ).toBeDefined()
    );
  });

  it('does not load location items when location is not set', async () => {
    useControlSpy.mockReturnValue([
      { location: undefined, history: [] },
      handleUpdateControlState,
    ]);

    useActionSpy.mockReturnValue([
      { ...locationItemsState, data: { result: [], nextToken: undefined } },
      handleUpdateActionState,
    ]);

    render(
      <Provider>
        <LocationDetailViewTable />
      </Provider>
    );

    await waitFor(() => {
      expect(handleUpdateActionState).not.toHaveBeenCalled();
    });
  });

  it('loads initial location items for a BUCKET location as expected', async () => {
    useControlSpy.mockReturnValue([controlState, handleUpdateControlState]);

    useActionSpy.mockReturnValue([locationItemsState, handleUpdateActionState]);

    render(
      <Provider>
        <LocationDetailViewTable />
      </Provider>
    );

    await waitFor(() => {
      expect(handleUpdateActionState).toHaveBeenCalledTimes(1);
      expect(handleUpdateActionState).toHaveBeenCalledWith({
        prefix: '',
        options: { delimiter: '/', pageSize: 1000, refresh: true },
      });
    });
  });

  it('loads initial location items for a PREFIX location as expected', async () => {
    const prefixControlState = {
      location: {
        scope: 's3://test-bucket/test-prefix/*',
        permission: 'READ',
        type: 'PREFIX',
      },
      history: ['test-prefix/'],
    };

    useControlSpy.mockReturnValue([
      prefixControlState,
      handleUpdateControlState,
    ]);

    render(
      <Provider>
        <LocationDetailViewTable />
      </Provider>
    );

    await waitFor(() => {
      expect(handleUpdateActionState).toHaveBeenCalledTimes(1);
      expect(handleUpdateActionState).toHaveBeenCalledWith({
        prefix: 'test-prefix/',
        options: { delimiter: '/', pageSize: 1000, refresh: true },
      });
    });
  });
});
