import { act, renderHook } from '@testing-library/react';

import type { LocationItemData } from '../../../actions';

import { useSort } from '../useSort';

const folder1: LocationItemData = {
  key: 'beta-folder/',
  id: 'folder-1',
  type: 'FOLDER',
};

const file1: LocationItemData = {
  key: 'prefix/charlie.txt',
  id: 'file-1',
  type: 'FILE',
  lastModified: new Date('2024-03-15'),
  size: 500,
};

const file2: LocationItemData = {
  key: 'prefix/alpha.png',
  id: 'file-2',
  type: 'FILE',
  lastModified: new Date('2024-01-01'),
  size: 1000,
};

const file3: LocationItemData = {
  key: 'prefix/beta.jpg',
  id: 'file-3',
  type: 'FILE',
  lastModified: new Date('2024-06-20'),
  size: 200,
};

const items: LocationItemData[] = [folder1, file1, file2, file3];

describe('useSort', () => {
  it('returns items as-is when no sort is active', () => {
    const { result } = renderHook(() => useSort({ items }));

    expect(result.current.sortedItems).toBe(items);
    expect(result.current.sortConfig).toBeUndefined();
  });

  it('returns empty array when items is undefined', () => {
    const { result } = renderHook(() => useSort({ items: undefined }));

    expect(result.current.sortedItems).toEqual([]);
  });

  it('sorts by name ascending on first click', () => {
    const { result } = renderHook(() => useSort({ items }));

    act(() => {
      result.current.onSort('name');
    });

    expect(result.current.sortConfig).toEqual({
      field: 'name',
      direction: 'ascending',
    });

    const ids = result.current.sortedItems.map((i) => i.id);
    expect(ids).toEqual(['folder-1', 'file-2', 'file-3', 'file-1']);
  });

  it('toggles to descending on second click of same column', () => {
    const { result } = renderHook(() => useSort({ items }));

    act(() => {
      result.current.onSort('name');
    });
    act(() => {
      result.current.onSort('name');
    });

    expect(result.current.sortConfig).toEqual({
      field: 'name',
      direction: 'descending',
    });
  });

  it('resets to ascending when switching columns', () => {
    const { result } = renderHook(() => useSort({ items }));

    act(() => {
      result.current.onSort('name');
    });
    act(() => {
      result.current.onSort('name');
    });

    expect(result.current.sortConfig?.direction).toBe('descending');

    act(() => {
      result.current.onSort('size');
    });

    expect(result.current.sortConfig).toEqual({
      field: 'size',
      direction: 'ascending',
    });
  });

  it('ignores non-sortable header keys', () => {
    const { result } = renderHook(() => useSort({ items }));

    act(() => {
      result.current.onSort('checkbox');
    });

    expect(result.current.sortConfig).toBeUndefined();
  });

  it('ignores download header key', () => {
    const { result } = renderHook(() => useSort({ items }));

    act(() => {
      result.current.onSort('download');
    });

    expect(result.current.sortConfig).toBeUndefined();
  });

  it('resets sort state', () => {
    const { result } = renderHook(() => useSort({ items }));

    act(() => {
      result.current.onSort('name');
    });

    expect(result.current.sortConfig).toBeDefined();

    act(() => {
      result.current.resetSort();
    });

    expect(result.current.sortConfig).toBeUndefined();
    expect(result.current.sortedItems).toBe(items);
  });

  it('sorts by last-modified', () => {
    const { result } = renderHook(() => useSort({ items }));

    act(() => {
      result.current.onSort('last-modified');
    });

    const fileIds = result.current.sortedItems
      .filter((i) => i.type === 'FILE')
      .map((i) => i.id);

    // ascending: oldest first
    expect(fileIds).toEqual(['file-2', 'file-1', 'file-3']);
  });

  it('sorts by size descending', () => {
    const { result } = renderHook(() => useSort({ items }));

    act(() => {
      result.current.onSort('size');
    });
    act(() => {
      result.current.onSort('size');
    });

    const fileIds = result.current.sortedItems
      .filter((i) => i.type === 'FILE')
      .map((i) => i.id);

    // descending: largest first, files before folders
    expect(fileIds).toEqual(['file-2', 'file-1', 'file-3']);
  });
});
