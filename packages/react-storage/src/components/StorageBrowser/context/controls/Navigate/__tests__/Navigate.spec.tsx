import { LocationData } from '../../../actions';
import { NavigateAction, navigateReducer, NavigateState } from '../Navigate';

describe('navigateReducer', () => {
  const location: LocationData = {
    bucket: 'bucket-name',
    scope: 's3://',
    permission: 'READ',
    type: 'OBJECT',
    prefix: undefined,
  };

  it('handles a SELECT_LOCATION as expected', () => {
    const initialState: NavigateState = {
      location: undefined,
      history: undefined,
    };

    const action: NavigateAction = { type: 'SELECT_LOCATION', location };

    const expectedState: NavigateState = {
      location: {
        bucket: location.bucket,
        permission: location.permission,
        scope: `s3://${location.bucket}/*`,
        type: location.type,
        prefix: location.prefix,
      },
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
      name: 'folder2/',
    };

    const expectedState: NavigateState = {
      location: {
        bucket: location.bucket,
        permission: location.permission,
        scope: `s3://${location.bucket}/${action.name}*`,
        type: location.type,
        prefix: action.name,
      },
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
      location: {
        bucket: location.bucket,
        permission: location.permission,
        scope: `s3://${location.bucket}/${action.name}*`,
        type: location.type,
        prefix: action.name,
      },
      history: ['folder1/'],
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('handles ENTER_FOLDER when the same folder is selected', () => {
    const state: NavigateState = {
      location,
      history: ['folder1/'],
    };

    const action: NavigateAction = { type: 'ENTER_FOLDER', name: 'folder1/' };

    const expectedState: NavigateState = state;

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('handles an EXIT_FOLDER as expected', () => {
    const state: NavigateState = {
      location,
      history: ['folder1/', 'folder2/', 'folder3/'],
    };

    const action: NavigateAction = { type: 'EXIT_FOLDER', name: 'folder2/' };

    const expectedState: NavigateState = {
      location: {
        bucket: location.bucket,
        permission: location.permission,
        scope: `s3://${location.bucket}/${action.name}*`,
        type: location.type,
        prefix: action.name,
      },
      history: ['folder1/', 'folder2/'],
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('handles an EXIT_FOLDER out of bounds as expected', () => {
    const state: NavigateState = {
      location,
      history: ['folder1/', 'folder2/', 'folder3/'],
    };

    const action: NavigateAction = { type: 'EXIT_FOLDER', name: 'folder4/' };

    const expectedState: NavigateState = state;

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });
});
