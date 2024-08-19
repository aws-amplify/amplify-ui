import React from 'react';
import { render, waitFor } from '@testing-library/react';

import createProvider from '../../../createProvider';
import * as ControlsModule from '../../../context/controls/';
import * as ActionsModule from '../../../context/actions';
import { LocationItem } from '../../../context/actions';

import {
  Column,
  defaultTableSort,
  SortDirection,
  TableControl,
  tableSortReducer,
  LocationDetailViewTable,
} from '../Table';

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

type MockColumnType = {
  name: string;
  size: number;
  type: string;
};

const columns: Column<MockColumnType>[] = [
  { key: 'name', header: 'Name' },
  { key: 'type', header: 'File type' },
  { key: 'size', header: 'Size' },
];

const data = [
  { name: 'test1', size: 100, type: 'file' },
  { name: 'test2', size: 200, type: 'file' },
];

const renderHeaderItem = jest.fn();
const renderRowItem = jest.fn();

describe('TableControl', () => {
  it('renders the table control', () => {
    expect(
      render(
        <TableControl
          data={data}
          columns={columns}
          renderRowItem={renderRowItem}
          renderHeaderItem={renderHeaderItem}
        />
      ).container
    ).toBeDefined();
  });
});

describe('tableSortReducer', () => {
  it('toggles sort direction correctly', () => {
    const state: { direction: SortDirection; selection: string } = {
      direction: 'ASCENDING',
      selection: 'name',
    };
    const action = { selection: 'name' };

    expect(tableSortReducer(state, action)).toEqual({
      direction: 'DESCENDING',
      selection: 'name',
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
  it('switches selection correctly', () => {
    const state: { direction: SortDirection; selection: string } = {
      direction: 'ASCENDING',
      selection: 'name',
    };
    const action = { selection: 'size' };

    expect(tableSortReducer(state, action)).toEqual({
      direction: 'ASCENDING',
      selection: 'size',
    });
  });
});

describe('defaultTableSort', () => {
  it('sorts data correctly', () => {
    const data = [
      { name: 'test1', size: 100, type: 'file' },
      { name: 'test2', size: 200, type: 'file' },
    ];

    expect(defaultTableSort(data, 'ASCENDING', 'name')).toEqual([
      { name: 'test1', size: 100, type: 'file' },
      { name: 'test2', size: 200, type: 'file' },
    ]);

    expect(defaultTableSort(data, 'ASCENDING', 'size')).toEqual([
      { name: 'test1', size: 100, type: 'file' },
      { name: 'test2', size: 200, type: 'file' },
    ]);

    expect(defaultTableSort(data, 'DESCENDING', 'size')).toEqual([
      { name: 'test2', size: 200, type: 'file' },
      { name: 'test1', size: 100, type: 'file' },
    ]);
  });

  it('sorts date strings correctly', () => {
    const data = [
      { date: '2024-08-14' },
      { date: '2024-08-12' },
      { date: '2024-08-13' },
      { date: '2024-08-13' },
    ];

    expect(defaultTableSort(data, 'ASCENDING', 'date')).toEqual([
      { date: '2024-08-12' },
      { date: '2024-08-13' },
      { date: '2024-08-13' },
      { date: '2024-08-14' },
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
    expect(defaultTableSort(data, 'DESCENDING', 'date')).toEqual([
      { date: '2024-08-14' },
      { date: '2024-08-13' },
      { date: '2024-08-13' },
      { date: '2024-08-12' },
    ]);
  });

  it('sorts data with null values correctly', () => {
    const data = [
      { value: null, name: 'test1' },
      { value: 5, name: 'test2' },
      { value: 20, name: 'test3' },
      { value: null, name: 'test4' },
    ];

    expect(defaultTableSort(data, 'ASCENDING', 'value')).toEqual([
      { value: 5, name: 'test2' },
      { value: 20, name: 'test3' },
      { value: null, name: 'test1' },
      { value: null, name: 'test4' },
    ]);

    expect(defaultTableSort(data, 'DESCENDING', 'value')).toEqual([
      { value: null, name: 'test1' },
      { value: null, name: 'test4' },
      { value: 20, name: 'test3' },
      { value: 5, name: 'test2' },
    ]);
  });
});
