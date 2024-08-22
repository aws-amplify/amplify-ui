import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import createProvider from '../../../createProvider';
import * as ControlsModule from '../../../context/controls/';
import * as ActionsModule from '../../../context/actions';
import { LocationItem, Permission } from '../../../context/actions';

import {
  Column,
  LocationDetailViewTable,
  LocationsViewTable,
  TableControl,
} from '../Table';
import { LocationAccess } from '../../../context/types';

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');
const useActionSpy = jest.spyOn(ActionsModule, 'useAction');
const useLocations = jest.spyOn(ActionsModule, 'useLocationsData');

const handleUpdateControlState = jest.fn();
const controlState = {
  location: {
    scope: 's3://test-bucket/*',
    permission: 'READ',
    type: 'BUCKET',
  },
  history: [{ prefix: '', position: 0 }],
  path: '',
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

  it('calls renderHeaderItem and renderRowItem to render the TableControl', () => {
    const renderHeaderItemSpy = jest.fn();
    const renderRowItemSpy = jest.fn();

    const columns: Column<LocationItem>[] = [
      {
        header: 'Name',
        key: 'key',
      },
      {
        header: 'Type',
        key: 'type',
      },
    ];

    render(
      <TableControl
        data={locationItems}
        columns={columns}
        renderHeaderItem={renderHeaderItemSpy}
        renderRowItem={renderRowItemSpy}
      />
    );

    expect(renderHeaderItemSpy).toHaveBeenCalled();
    expect(renderRowItemSpy).toHaveBeenCalled();
  });
});

describe('LocationsViewTable', () => {
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
      { location: undefined, history: [], path: '' },
      handleUpdateControlState,
    ]);

    useActionSpy.mockReturnValue([
      { ...locationItemsState, data: { result: [], nextToken: undefined } },
      handleUpdateActionState,
    ]);

    await waitFor(() => {
      render(
        <Provider>
          <LocationDetailViewTable />
        </Provider>
      );
    });

    expect(handleUpdateActionState).not.toHaveBeenCalled();
  });

  it('sorts descending when sortDirection is descending', async () => {
    const mockData: LocationAccess<Permission>[] = [
      {
        type: 'PREFIX',
        permission: 'READWRITE',
        scope: 's3://filebucket-dev/public/*',
      },
      {
        type: 'PREFIX',
        permission: 'READWRITE',
        scope: 's3://filebucket-dev/private/*',
      },
      {
        type: 'PREFIX',
        permission: 'READWRITE',
        scope: 's3://filebucket-dev/protected/*',
      },
    ];

    const sortSpy = jest.spyOn(Array.prototype, 'sort');

    useLocations.mockReturnValue([
      {
        data: {
          result: mockData,
          nextToken: undefined,
        },
        hasError: false,
        isLoading: false,
        message: undefined,
      },
      jest.fn(),
    ]);

    await waitFor(() => {
      render(
        <Provider>
          <LocationsViewTable />
        </Provider>
      );
    });

    const nameColumn = screen.getByRole('button', { name: 'Name' });

    expect(nameColumn).toBeDefined();

    fireEvent.click(nameColumn);

    expect(sortSpy).toHaveBeenCalled();
  });
});

describe('LocationDetailViewTable', () => {
  beforeEach(() => {
    useActionSpy.mockClear();
    useControlSpy.mockClear();

    handleUpdateActionState.mockClear();
    handleUpdateControlState.mockClear();
  });

  it('loads initial location items for a BUCKET location as expected', async () => {
    useControlSpy.mockReturnValue([controlState, handleUpdateControlState]);

    useActionSpy.mockReturnValue([locationItemsState, handleUpdateActionState]);

    await waitFor(() => {
      render(
        <Provider>
          <LocationDetailViewTable />
        </Provider>
      );
    });

    expect(handleUpdateActionState).toHaveBeenCalledTimes(1);
    expect(handleUpdateActionState).toHaveBeenCalledWith({
      prefix: '',
      options: { delimiter: '/', pageSize: 1000, refresh: true },
    });
  });

  it('loads initial location items for a PREFIX location as expected', async () => {
    const prefixControlState = {
      location: {
        scope: 's3://test-bucket/test-prefix/*',
        permission: 'READ',
        type: 'PREFIX',
      },
      history: [{ prefix: 'test-prefix/', position: 0 }],
      path: 'test-prefix/',
    };

    useControlSpy.mockReturnValue([
      prefixControlState,
      handleUpdateControlState,
    ]);

    await waitFor(() => {
      render(
        <Provider>
          <LocationDetailViewTable />
        </Provider>
      );
    });

    expect(handleUpdateActionState).toHaveBeenCalledTimes(1);
    expect(handleUpdateActionState).toHaveBeenCalledWith({
      prefix: 'test-prefix/',
      options: { delimiter: '/', pageSize: 1000, refresh: true },
    });
  });
});
