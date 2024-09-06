import { locationActionsReducer } from '../locationActions';
import { LocationActionsState, LocationActionsAction } from '../types';

describe('locationActionsReducer', () => {
  it('handles a SET_ACTION action as expected', () => {
    const initialState: LocationActionsState = {
      actions: {},
      selected: {
        type: undefined,
        items: undefined,
      },
    };
    const action: LocationActionsAction = {
      payload: 'UPLOAD_FILES',
      type: 'SET_ACTION',
    };

    const newState = locationActionsReducer(initialState, action);
    const expectedState = {
      actions: {},
      selected: {
        type: 'UPLOAD_FILES',
        items: undefined,
      },
    };
    expect(newState).toEqual(expectedState);
  });

  it('handles a CLEAR action as expected', () => {
    const initialState: LocationActionsState = {
      actions: {},
      selected: {
        type: 'UPLOAD_FILES',
        items: [],
      },
    };
    const action: LocationActionsAction = { type: 'CLEAR' };
    const newState = locationActionsReducer(initialState, action);

    const expectedState = {
      actions: {},
      selected: {
        actionType: undefined,
        items: undefined,
      },
    };
    expect(newState).toEqual(expectedState);
  });
  it.todo('handles a SET_FILES as expected');
  it.todo('handles a SELECT_LOCATION_ITEM as expected');
  it.todo('handles a DESELECT_LOCATION_ITEM as expected');
  it.todo('handles a DESELECT_ALL_LOCATION_ITEMS as expected');
});
