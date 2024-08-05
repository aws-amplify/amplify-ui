import { LocationAccess, LocationData } from '../../../types';

import { NavigateAction, navigateReducer, NavigateState } from '../Navigate';

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
    const initialState: NavigateState = {
      history: [],
      location: undefined,
    };

    const action: NavigateAction = {
      type: 'ACCESS_LOCATION',
      location: locationAccess,
    };

    const expectedState: NavigateState = {
      history: [location.bucket],
      location: locationAccess,
    };

    const newState = navigateReducer(initialState, action);

    expect(newState).toStrictEqual(expectedState);
  });

  it('handles a NAVIGATE action as expected when target location is root', () => {
    const state: NavigateState = {
      history: [location.bucket, location.prefix],
      location: locationAccess,
    };

    const action: NavigateAction = {
      type: 'NAVIGATE',
      prefix: location.bucket,
    };

    const expectedState: NavigateState = {
      history: [location.bucket],
      location: locationAccess,
    };

    const newState = navigateReducer(state, action);

    expect(newState).toStrictEqual(expectedState);
  });

  it('handles a NAVIGATE action to a new location', () => {
    const state: NavigateState = {
      history: [location.bucket],
      location: locationAccess,
    };

    const action: NavigateAction = {
      type: 'NAVIGATE',
      prefix: locationTwo.prefix,
    };

    const expectedState: NavigateState = {
      history: [location.bucket, locationTwo.prefix],
      location: locationAccess,
    };

    const newState = navigateReducer(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('handles a NAVIGATE action to a previous location', () => {
    const state: NavigateState = {
      history: [
        location.bucket,
        locationTwo.prefix,
        'public/folder1/',
        'public/folder1/nestedFolder/',
      ],
      location: locationAccess,
    };

    const action: NavigateAction = {
      type: 'NAVIGATE',
      prefix: locationTwo.prefix,
    };

    const expectedState: NavigateState = {
      history: [location.bucket, locationTwo.prefix],
      location: locationAccess,
    };

    const newState = navigateReducer(state, action);

    expect(newState).toStrictEqual(expectedState);
  });

  it('handles an EXIT action as expected', () => {
    const state: NavigateState = {
      history: [location.bucket],
      location: locationAccess,
    };

    const action: NavigateAction = { type: 'EXIT' };

    const expectedState: NavigateState = {
      history: [],
      location: undefined,
    };

    const newState = navigateReducer(state, action);

    expect(newState).toStrictEqual(expectedState);
  });
});
