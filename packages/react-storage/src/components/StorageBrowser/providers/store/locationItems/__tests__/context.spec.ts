import { act, renderHook } from '@testing-library/react';

import { FileData } from '../../../../actions/handlers';
import { useLocationItems, LocationItemsProvider } from '../context';

const fileDataItemOne: FileData = {
  id: 'id-one',
  key: 'key-one',
  lastModified: new Date(),
  size: 100,
  type: 'FILE',
};

const fileDataItemTwo: FileData = {
  id: 'id-two',
  key: 'key-two',
  lastModified: new Date(),
  size: 200,
  type: 'FILE',
};

describe('useLocationItems', () => {
  it('updates the value of `fileDataItems` as expected', () => {
    const { result } = renderHook(() => useLocationItems(), {
      wrapper: LocationItemsProvider,
    });

    const [initState, handler] = result.current;

    expect(initState.fileDataItems).toBeUndefined();

    const fileDataItems: FileData[] = [fileDataItemOne];

    act(() => {
      handler({ type: 'SET_LOCATION_ITEMS', items: fileDataItems });
    });

    const [nextState] = result.current;

    // has same reference
    expect(nextState.fileDataItems).toBe(fileDataItems);

    const additionalFileDataItems = [...fileDataItems, fileDataItemTwo];

    act(() => {
      handler({ type: 'SET_LOCATION_ITEMS', items: additionalFileDataItems });
    });

    const [updatedState] = result.current;

    // ignores pre-existing file data item
    expect(updatedState.fileDataItems).toHaveLength(2);

    const targetId = fileDataItemOne.id;
    act(() => {
      handler({ type: 'REMOVE_LOCATION_ITEM', id: targetId });
    });

    const [removedState] = result.current;

    expect(removedState.fileDataItems).toHaveLength(1);

    // remaining item
    expect(removedState.fileDataItems?.[0].id).toBe(fileDataItemTwo.id);
  });
});
