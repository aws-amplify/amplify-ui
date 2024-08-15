import React from 'react';
import { render } from '@testing-library/react';

import {
  Column,
  defaultTableSort,
  SortDirection,
  TableControl,
  tableSortReducer,
} from '../Table';

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
