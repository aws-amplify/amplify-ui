import { LocationData } from '../../../actions';
import { NavigateAction, navigateReducer, NavigateState } from '../Navigate';

describe('navigateReducer', () => {
  const location: LocationData = {
    bucket: 'bucket-name',
    scope: 's3://',
    permission: 'READ',
    type: 'OBJECT',
  };

  it('handles a SELECT_LOCATION as expected', () => {
    const initialState: NavigateState = {
      location: {
        current: undefined,
        shouldRefresh: false,
      },
      history: {
        list: undefined,
        shouldRefresh: false,
      },
    };

    const action: NavigateAction = { type: 'SELECT_LOCATION', location };

    const expectedState: NavigateState = {
      location: {
        current: location,
        shouldRefresh: false,
      },
      history: {
        list: undefined,
        shouldRefresh: true,
      },
    };

    const newState = navigateReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('handles a DESELECT_LOCATION as expected', () => {
    const state: NavigateState = {
      location: {
        current: location,
        shouldRefresh: false,
      },
      history: {
        list: ['folder1/', 'folder2/'],
        shouldRefresh: true,
      },
    };

    const action: NavigateAction = { type: 'DESELECT_LOCATION' };

    const expectedState: NavigateState = {
      location: {
        current: undefined,
        shouldRefresh: true,
      },
      history: {
        list: undefined,
        shouldRefresh: false,
      },
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('handles a ENTER_FOLDER as expected', () => {
    const state: NavigateState = {
      location: {
        current: location,
        shouldRefresh: false,
      },
      history: {
        list: ['folder1/'],
        shouldRefresh: false,
      },
    };

    const action: NavigateAction = {
      type: 'ENTER_FOLDER',
      name: 'folder2/',
    };

    const expectedState: NavigateState = {
      location: {
        current: location,
        shouldRefresh: false,
      },
      history: {
        list: ['folder1/', 'folder2/'],
        shouldRefresh: true,
      },
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('should handle ENTER_FOLDER with undefined history', () => {
    const state: NavigateState = {
      location: {
        current: location,
        shouldRefresh: false,
      },
      history: {
        list: undefined,
        shouldRefresh: false,
      },
    };

    const action: NavigateAction = { type: 'ENTER_FOLDER', name: 'folder1/' };

    const expectedState: NavigateState = {
      location: {
        current: location,
        shouldRefresh: false,
      },
      history: {
        list: ['folder1/'],
        shouldRefresh: true,
      },
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('handles a EXIT_FOLDER as expected', () => {
    const state: NavigateState = {
      location: {
        current: location,
        shouldRefresh: false,
      },
      history: {
        list: ['folder1/', 'folder2/', 'folder3/'],
        shouldRefresh: false,
      },
    };

    const action: NavigateAction = { type: 'EXIT_FOLDER', index: 1 };

    const expectedState: NavigateState = {
      location: {
        current: location,
        shouldRefresh: false,
      },
      history: {
        list: ['folder1/', 'folder2/'],
        shouldRefresh: true,
      },
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });
});
