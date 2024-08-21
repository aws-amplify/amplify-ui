import { LocationAccess, LocationData } from '../../../types';

import {
  INITIAL_STATE,
  NavigateAction,
  navigateReducer,
  NavigateState,
} from '../Navigate';

const location: LocationData = {
  bucket: 'bucket-name',
  permission: 'READ',
  type: 'BUCKET',
  prefix: '',
};

const locationTwo: LocationData = {
  bucket: 'bucket-name',
  permission: 'READ',
  type: 'PREFIX',
  prefix: 'public/',
};

const locationAccess: LocationAccess = {
  permission: location.permission,
  scope: `s3://${location.bucket}/*`,
  type: location.type,
};

describe('navigateReducer', () => {
  it('ACCESS_LOCATION action sets the location and bucket as the initial entry value', () => {
    const initialState: NavigateState = INITIAL_STATE;

    const action: NavigateAction = {
      type: 'ACCESS_LOCATION',
      location: locationAccess,
    };

    const expectedState: NavigateState = {
      history: [{ prefix: location.prefix, position: 0 }],
      location: locationAccess,
      path: location.prefix,
    };

    const newState = navigateReducer(initialState, action);

    expect(newState).toStrictEqual(expectedState);
  });

  it('handles a NAVIGATE action as expected when target prefix is root', () => {
    const state: NavigateState = {
      history: [
        { prefix: location.prefix, position: 0 },
        { prefix: locationTwo.prefix, position: 1 },
      ],
      location: locationAccess,
      path: `${location.prefix}${locationTwo.prefix}`,
    };

    const action: NavigateAction = {
      type: 'NAVIGATE',
      entry: { prefix: location.prefix, position: 0 },
    };

    const expectedState: NavigateState = {
      history: [{ prefix: location.prefix, position: 0 }],
      location: locationAccess,
      path: location.prefix,
    };

    const newState = navigateReducer(state, action);

    expect(newState).toStrictEqual(expectedState);
  });

  it('handles a NAVIGATE action to a new prefix', () => {
    const state: NavigateState = {
      history: [{ prefix: location.prefix, position: 0 }],
      location: locationAccess,
      path: location.prefix,
    };

    const action: NavigateAction = {
      type: 'NAVIGATE',
      entry: { prefix: locationTwo.prefix, position: 1 },
    };

    const expectedState: NavigateState = {
      history: [
        { prefix: location.prefix, position: 0 },
        { prefix: locationTwo.prefix, position: 1 },
      ],
      location: locationAccess,
      path: `${location.prefix}${locationTwo.prefix}`,
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('handles a NAVIGATE action between entries with the same prefix', () => {
    const state: NavigateState = {
      history: [{ prefix: location.prefix, position: 0 }],
      location: locationAccess,
      path: location.prefix,
    };

    const initialAction: NavigateAction = {
      type: 'NAVIGATE',
      entry: { prefix: location.prefix, position: 1 },
    };

    const initialExpectedState: NavigateState = {
      history: [
        { prefix: location.prefix, position: 0 },
        { prefix: location.prefix, position: 1 },
      ],
      location: locationAccess,
      path: `${location.prefix}${location.prefix}`,
    };

    const newState = navigateReducer(state, initialAction);

    expect(newState).toEqual(initialExpectedState);

    const nextAction: NavigateAction = {
      type: 'NAVIGATE',
      entry: { prefix: location.prefix, position: 0 },
    };

    const nextState = navigateReducer(initialExpectedState, nextAction);

    const nextExpectedState: NavigateState = {
      history: [{ prefix: location.prefix, position: 0 }],
      location: locationAccess,
      path: location.prefix,
    };

    expect(nextState).toEqual(nextExpectedState);
  });

  it('handles a NAVIGATE action to a previous prefix', () => {
    const path = `${location.prefix}${locationTwo.prefix}public/folder1/public/folder1/nestedFolder/`;
    const state: NavigateState = {
      history: [
        { prefix: location.prefix, position: 0 },
        { prefix: locationTwo.prefix, position: 1 },
        { prefix: 'public/folder1/', position: 2 },
        { prefix: 'public/folder1/nestedFolder/', position: 3 },
      ],
      location: locationAccess,
      path,
    };

    const action: NavigateAction = {
      type: 'NAVIGATE',
      entry: { prefix: locationTwo.prefix, position: 1 },
    };

    const expectedState: NavigateState = {
      history: [
        { prefix: location.prefix, position: 0 },
        { prefix: locationTwo.prefix, position: 1 },
      ],
      location: locationAccess,
      path: `${location.prefix}${locationTwo.prefix}`,
    };

    const newState = navigateReducer(state, action);

    expect(newState).toStrictEqual(expectedState);
  });

  it('handles an EXIT action as expected', () => {
    const state: NavigateState = {
      history: [{ prefix: location.prefix, position: 0 }],
      location: locationAccess,
      path: location.prefix,
    };

    const action: NavigateAction = { type: 'EXIT' };

    const newState = navigateReducer(state, action);

    expect(newState).toStrictEqual(INITIAL_STATE);
  });
});
