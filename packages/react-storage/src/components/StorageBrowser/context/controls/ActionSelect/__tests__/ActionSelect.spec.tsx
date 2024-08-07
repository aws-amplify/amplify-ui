import {
  actionSelectReducer,
  ActionSelectState,
  ActionSelectAction,
} from '../ActionSelect';

describe('actionSelectReducer', () => {
  it('handles a SELECT_ACTION_TYPE as expected', () => {
    const initialState: ActionSelectState = {
      actions: [],
      selected: {
        actionType: undefined,
        destination: undefined,
        items: undefined,
        name: undefined,
      },
    };
    const action: ActionSelectAction = {
      actionType: 'UPLOAD_FILES',
      type: 'SELECT_ACTION_TYPE',
      destination: 'public/',
      name: 'Upload files',
      items: [],
    };
    const newState = actionSelectReducer(initialState, action);
    const expectedState = {
      actions: [],
      selected: {
        ...action,
      },
    };
    expect(newState).toEqual(expectedState);
  });
  it('handles a EXIT as expected', () => {
    const initialState: ActionSelectState = {
      actions: [],
      selected: {
        actionType: 'UPLOAD_FILES',
        items: [],
        destination: 'some-prefix',
        name: 'Upload Files',
      },
    };
    const action: ActionSelectAction = {
      type: 'EXIT',
    };
    const newState = actionSelectReducer(initialState, action);
    const expectedState = {
      actions: [],
      selected: {
        actionType: undefined,
        items: undefined,
      },
    };
    expect(newState).toEqual(expectedState);
  });
  it.todo('handles a SET_UPLOAD_ITEMS as expected');
  it.todo('handles a SELECT_LOCATION_ITEM as expected');
  it.todo('handles a DESELECT_LOCATION_ITEM as expected');
  it.todo('handles a DESELECT_ALL_LOCATION_ITEMS as expected');
});
