import React from 'react';
import { render, waitFor } from '@testing-library/react';

import createProvider from '../../../createProvider';
import * as ControlsModule from '../../../context/controls/';
import * as ActionsModule from '../../../context/actions';

import { LocationDetailView } from '../LocationDetailView';

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');
const useActionSpy = jest.spyOn(ActionsModule, 'useAction');

const handleUpdateControlState = jest.fn();
const controlState = {
  location: {
    scope: 's3://test-bucket/*',
    permission: 'READ',
    type: 'BUCKET',
  },
  history: ['test-bucket'],
};

const locationItemsState = {
  data: { result: [], nextToken: undefined },
  hasError: false,
  isLoading: false,
  message: undefined,
};
const handleUpdateActionState = jest.fn();

useActionSpy.mockReturnValue([locationItemsState, handleUpdateActionState]);
useControlSpy.mockReturnValue([controlState, handleUpdateControlState]);

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);
const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
};
const Provider = createProvider({ config });

describe('LocationDetailView', () => {
  beforeEach(() => {
    useActionSpy.mockClear();
    useControlSpy.mockClear();

    handleUpdateActionState.mockClear();
    handleUpdateControlState.mockClear();
  });

  it('renders a `LocationDetailView`', async () => {
    await waitFor(() => {
      expect(
        render(
          <Provider>
            <LocationDetailView />
          </Provider>
        ).container
      ).toBeDefined();
    });
  });

  it('does not load location items when location is not set', async () => {
    useControlSpy.mockReturnValueOnce([
      { location: undefined, history: [] },
      handleUpdateControlState,
    ]);

    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    await waitFor(() => {
      expect(handleUpdateActionState).not.toHaveBeenCalled();
    });
  });

  it('loads initial location items for a BUCKET location as expected', async () => {
    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    await waitFor(() => {
      expect(handleUpdateActionState).toHaveBeenCalledTimes(1);
      expect(handleUpdateActionState).toHaveBeenCalledWith({
        prefix: '',
        config: {
          bucket: 'test-bucket',
          credentialsProvider: expect.any(Function),
          region: 'region',
        },
        options: { pageSize: 1000, refresh: true },
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
      history: ['test-bucket'],
    };

    useControlSpy.mockReturnValueOnce([
      prefixControlState,
      handleUpdateControlState,
    ]);

    render(
      <Provider>
        <LocationDetailView />
      </Provider>
    );

    await waitFor(() => {
      expect(handleUpdateActionState).toHaveBeenCalledTimes(1);
      expect(handleUpdateActionState).toHaveBeenCalledWith({
        prefix: 'test-prefix/',
        config: {
          bucket: 'test-bucket',
          credentialsProvider: expect.any(Function),
          region: 'region',
        },
        options: { pageSize: 1000, refresh: true },
      });
    });
  });
});
