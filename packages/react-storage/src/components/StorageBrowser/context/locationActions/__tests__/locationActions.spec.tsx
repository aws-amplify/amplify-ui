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

  it('handles a TOGGLE_SELECT_ITEM as expected', () => {
    const initialState: LocationActionsState = {
      actions: {},
      selected: {
        type: undefined,
        items: [],
      },
    };
    const item = {
      key: 'key',
      lastModified: new Date(),
      size: 1000,
      type: 'FILE' as const,
    };
    const action: LocationActionsAction = {
      type: 'TOGGLE_SELECTED_ITEM',
      item,
    };
    const newState = locationActionsReducer(initialState, action);

    const expectedState = {
      actions: {},
      selected: {
        type: undefined,
        items: [item],
      },
    };
    expect(newState).toEqual(expectedState);

    const unToggleAction: LocationActionsAction = {
      type: 'TOGGLE_SELECTED_ITEM',
      item,
    };
    const unToggledState = locationActionsReducer(newState, unToggleAction);

    const unToggledExpectedState = {
      actions: {},
      selected: {
        type: undefined,
        items: [],
      },
    };
    expect(unToggledState).toEqual(unToggledExpectedState);
  });

  it('handles a TOGGLE_SELECT_ITEMS as expected', () => {
    const initialState: LocationActionsState = {
      actions: {},
      selected: {
        type: undefined,
        items: [],
      },
    };
    const item = {
      key: 'key',
      lastModified: new Date(),
      size: 1000,
      type: 'FILE' as const,
    };
    const action: LocationActionsAction = {
      type: 'TOGGLE_SELECTED_ITEMS',
      items: [item, item, item],
    };
    const newState = locationActionsReducer(initialState, action);

    const expectedState = {
      actions: {},
      selected: {
        type: undefined,
        items: [item, item, item],
      },
    };
    expect(newState).toEqual(expectedState);

    const unselectAllAction: LocationActionsAction = {
      type: 'TOGGLE_SELECTED_ITEMS',
    };
    const unselectAllState = locationActionsReducer(
      initialState,
      unselectAllAction
    );

    const unselectAllExpectedState = {
      actions: {},
      selected: {
        type: undefined,
        items: [],
      },
    };
    expect(unselectAllState).toEqual(unselectAllExpectedState);
  });
});
