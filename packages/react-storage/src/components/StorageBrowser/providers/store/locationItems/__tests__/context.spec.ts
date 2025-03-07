import { act, renderHook } from '@testing-library/react';

import { FileData } from '../../../../actions';

import { FileDataItem } from '../types';
import { useLocationItems, LocationItemsProvider } from '../context';

const fileDataOne: FileData = {
  id: 'id-one',
  key: 'some-prefix/key-one',
  lastModified: new Date(),
  size: 100,
  type: 'FILE',
};

const fileDataItemOne: FileDataItem = {
  ...fileDataOne,
  fileKey: 'key-one',
};

const fileDataTwo: FileData = {
  id: 'id-two',
  key: 'some-prefix/key-two',
  lastModified: new Date(),
  size: 200,
  type: 'FILE',
};

const fileDataItemTwo: FileDataItem = {
  ...fileDataTwo,
  fileKey: 'key-two',
};

describe('useLocationItems', () => {
  it('updates the value of `fileDataItems` as expected', () => {
    const { result } = renderHook(() => useLocationItems(), {
      wrapper: LocationItemsProvider,
    });

    const [initState, handler] = result.current;

    expect(initState.fileDataItems).toBeUndefined();

    const items: FileData[] = [fileDataOne];

    act(() => {
      handler({ type: 'SET_LOCATION_ITEMS', items });
    });

    const [nextState] = result.current;

    expect(nextState.fileDataItems).toStrictEqual([fileDataItemOne]);

    const additionalItems = [...items, fileDataTwo];

    act(() => {
      handler({ type: 'SET_LOCATION_ITEMS', items: additionalItems });
    });

    const [updatedState] = result.current;

    // ignores pre-existing file data item
    expect(updatedState.fileDataItems).toHaveLength(2);
    expect(updatedState.fileDataItems).toStrictEqual([
      fileDataItemOne,
      fileDataItemTwo,
    ]);

    const targetId = fileDataOne.id;

    act(() => {
      handler({ type: 'REMOVE_LOCATION_ITEM', id: targetId });
    });

    const [removedState] = result.current;

    expect(removedState.fileDataItems).toHaveLength(1);

    // remaining item
    expect(removedState.fileDataItems?.[0].id).toBe(fileDataTwo.id);
  });

  it('returns prevState on remove when filtered items have the same length as previous items', () => {
    const { result } = renderHook(() => useLocationItems(), {
      wrapper: LocationItemsProvider,
    });

    const handler = result.current[1];

    act(() => {
      handler({
        type: 'SET_LOCATION_ITEMS',
        items: [fileDataOne, fileDataItemTwo],
      });
    });

    const [nextState] = result.current;

    expect(nextState.fileDataItems).toHaveLength(2);

    act(() => {
      handler({ type: 'REMOVE_LOCATION_ITEM', id: '🥵' });
    });

    const [resultState] = result.current;

    expect(resultState.fileDataItems).toHaveLength(2);
    // has same reference
    expect(resultState).toBe(resultState);
  });
});
