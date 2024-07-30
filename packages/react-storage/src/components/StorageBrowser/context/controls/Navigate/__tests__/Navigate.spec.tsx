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
      location: undefined,
      history: undefined,
    };

    const action: NavigateAction = { type: 'SELECT_LOCATION', location };

    const expectedState: NavigateState = {
      location,
      history: undefined,
    };

    const newState = navigateReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('handles a DESELECT_LOCATION as expected', () => {
    const state: NavigateState = {
      location,
      history: ['folder1/', 'folder2/'],
    };

    const action: NavigateAction = { type: 'DESELECT_LOCATION' };

    const expectedState: NavigateState = {
      location: undefined,
      history: undefined,
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('handles a ENTER_FOLDER as expected', () => {
    const state: NavigateState = {
      location,
      history: ['folder1/'],
    };

    const action: NavigateAction = {
      type: 'ENTER_FOLDER',
      name: 'folder2/' as `${string}/`,
    };

    const expectedState: NavigateState = {
      location,
      history: ['folder1/', 'folder2/'],
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('should handle ENTER_FOLDER with undefined history', () => {
    const state: NavigateState = {
      location,
      history: undefined,
    };

    const action: NavigateAction = { type: 'ENTER_FOLDER', name: 'folder1/' };

    const expectedState: NavigateState = {
      location,
      history: ['folder1/'],
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('handles a EXIT_FOLDER as expected', () => {
    const state: NavigateState = {
      location,
      history: ['folder1/', 'folder2/', 'folder3/'],
    };

    const action: NavigateAction = { type: 'EXIT_FOLDER', index: 1 };

    const expectedState: NavigateState = {
      location,
      history: ['folder1/', 'folder2/'],
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('should handle EXIT_FOLDER with index out of bounds', () => {
    const state: NavigateState = {
      location,
      history: ['folder1/', 'folder2/', 'folder3/'],
    };

    const action: NavigateAction = { type: 'EXIT_FOLDER', index: 5 };

    const expectedState: NavigateState = {
      location,
      history: ['folder1/', 'folder2/', 'folder3/'],
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });
});
