import { LocationData } from '../../actions';

import { DEFAULT_STATE } from '../constants';
import storeReducer from '../storeReducer';

const location: LocationData = {
  bucket: 'bucket',
  id: 'id',
  permissions: ['delete', 'get', 'list', 'write'],
  prefix: 'prefix/',
  type: 'PREFIX',
};

describe('storeReducer', () => {
  it('returns the expected state on change `location` event', () => {
    const output = storeReducer(DEFAULT_STATE, {
      type: 'CHANGE_LOCATION',
      location,
    });

    const expected = {
      actionType: undefined,
      location: { current: location, path: '', key: location.prefix },
    };

    expect(output).toStrictEqual(expected);
  });

  it('returns the expected state on change `location` event if `state.location` is unchanged', () => {
    const initialOutput = storeReducer(DEFAULT_STATE, {
      type: 'CHANGE_LOCATION',
      location,
    });

    expect(initialOutput).toStrictEqual({
      actionType: undefined,
      location: { current: location, path: '', key: location.prefix },
    });

    const nextOutput = storeReducer(initialOutput, {
      type: 'CHANGE_LOCATION',
      location,
    });

    // assert referential equality
    expect(initialOutput).toBe(nextOutput);
  });

  it('returns the expected state on reset `location` event', () => {
    const state = {
      ...DEFAULT_STATE,
      location: { ...DEFAULT_STATE.location, current: location },
    };

    const output = storeReducer(state, { type: 'RESET_LOCATION' });

    expect(output).toStrictEqual(DEFAULT_STATE);
  });

  it('returns the expected state on reset `location` event if `state.location` is unchanged', () => {
    const state = {
      ...DEFAULT_STATE,
      location: { ...DEFAULT_STATE.location, current: location },
    };

    const initialOutput = storeReducer(state, { type: 'RESET_LOCATION' });

    expect(initialOutput).toStrictEqual(DEFAULT_STATE);

    const nextOutput = storeReducer(initialOutput, { type: 'RESET_LOCATION' });

    // assert referential equality
    expect(nextOutput).toBe(initialOutput);
  });

  it('returns the expected state on change `actionType` event', () => {
    const actionType = 'some-action';

    const output = storeReducer(DEFAULT_STATE, {
      type: 'CHANGE_ACTION_TYPE',
      actionType,
    });

    expect(output).toStrictEqual({ ...DEFAULT_STATE, actionType });
  });

  it('returns the expected state on change `actionType` event if `state.actionType` is unchanged', () => {
    const actionType = 'some-action';

    const initialOutput = storeReducer(DEFAULT_STATE, {
      type: 'CHANGE_ACTION_TYPE',
      actionType,
    });

    expect(initialOutput).toStrictEqual({ ...DEFAULT_STATE, actionType });

    const nextOutput = storeReducer(initialOutput, {
      type: 'CHANGE_ACTION_TYPE',
      actionType,
    });

    // assert referential equality
    expect(nextOutput).toBe(initialOutput);
  });

  it('returns the expected state on reset `actionType` event', () => {
    const actionType = 'some-action';

    const output = storeReducer(
      { ...DEFAULT_STATE, actionType },
      { type: 'RESET_ACTION_TYPE' }
    );

    expect(output).toStrictEqual(DEFAULT_STATE);
  });

  it('returns the same state on reset `actionType` event if `state.actionType` is `undefined`', () => {
    const actionType = 'some-action';

    const initialOutput = storeReducer(
      { ...DEFAULT_STATE, actionType },
      { type: 'RESET_ACTION_TYPE' }
    );

    expect(initialOutput).toStrictEqual(DEFAULT_STATE);

    const nextOutput = storeReducer(initialOutput, {
      type: 'RESET_ACTION_TYPE',
    });

    // assert referential equality
    expect(nextOutput).toBe(initialOutput);
  });
});
