import { renderHook } from '@testing-library/react';
import useResolveDataTable from '../useResolveTableData';
import { DataTableResolvers } from '../types';

type Key = (typeof keys)[number];
type Item = { value: string };
type Props = { optional?: boolean };

const keys = ['column-one', 'column-two', 'column-three'] as const;

const items: Item[] = [{ value: 'item-one' }, { value: 'item-two' }];

interface Resolvers extends DataTableResolvers<Key, Props, Item> {}

const resolvers: Resolvers = {
  getCell: jest.fn(({ key, item, props }) => ({
    type: 'text',
    key: `${key}-${item.value}`,
    content: { text: props.optional ? 'optional' : 'not optional' },
  })),
  getHeader: jest.fn(({ key }) => ({ type: 'text', key, content: {} })),
  getRowKey: jest.fn(({ item }) => item.value),
};

describe('useResolveTableData', () => {
  it('returns the expected values when provided items', () => {
    const data = { items, props: {} };

    const { result } = renderHook(() =>
      useResolveDataTable(keys, resolvers, data)
    );

    const { headers, rows } = result.current;

    expect(headers).toHaveLength(3);

    const [headerOne] = headers;
    expect(headerOne.key).toBe(keys[0]);
    expect(headerOne.type).toBe('text');
    expect(headerOne.content).toStrictEqual({});

    expect(rows).toHaveLength(2);

    const [rowOne] = rows;

    expect(rowOne.key).toBe(items[0].value);
    expect(rowOne.content).toHaveLength(3);

    const [cellOne] = rowOne.content;

    expect(cellOne.type).toBe('text');
    expect(cellOne.content).toStrictEqual({ text: 'not optional' });
    expect(cellOne.key).toBe(`${keys[0]}-${items[0].value}`);
  });

  it('returns an empty array of rows when no items are provided', () => {
    const data = { props: {} };

    const { result } = renderHook(() =>
      useResolveDataTable(keys, resolvers, data)
    );

    expect(result.current.rows).toHaveLength(0);
  });

  it('returns the previous value when provided the same props', () => {
    const data = { props: {} };

    const { rerender, result } = renderHook(() =>
      useResolveDataTable(keys, resolvers, data)
    );

    const initData = result.current;

    rerender();

    const nextData = result.current;

    expect(nextData).toBe(initData);
  });
});
