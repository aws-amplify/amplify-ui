import { LocationData } from '../../actions';

import { DEFAULT_STATE } from '../constants';
import { LocationValue } from '../types';
import {
  getState,
  getInitialState,
  getLocationData,
  parseLocationType,
} from '../utils';

const location: LocationData = {
  bucket: 'bucket',
  id: 'id',
  permissions: ['delete', 'get', 'list', 'write'],
  prefix: 'prefix/',
  type: 'OBJECT' as const,
};

Object.defineProperty(globalThis, 'crypto', {
  value: { randomUUID: () => 'intentionally-static-test-id' },
});

describe('getInitialState', () => {
  it('returns the expected state when `defaultValue` is `null`', () => {
    const output = getInitialState(null);
    expect(output).toBe(DEFAULT_STATE);
  });

  it('returns the expected state when `defaultValue` has a `location` missing `id` and `type` values', () => {
    const location: LocationValue = {
      bucket: 'bucket',
      permissions: ['delete', 'get', 'list', 'write'],
      prefix: 'prefix/',
    };

    const output = getInitialState({ location });

    expect(output).toStrictEqual({
      actionType: undefined,
      location: {
        current: {
          ...location,
          id: 'intentionally-static-test-id',
          type: 'PREFIX',
        },
        key: 'prefix/',
        path: '',
      },
    });
  });

  it('returns the expected state when `defaultValue` is `undefined`', () => {
    const output = getInitialState(undefined);
    expect(output).toBe(DEFAULT_STATE);
  });

  it('returns the expected state when `defaultValue` is `undefined` and provided `legacyProps`', () => {
    const output = getInitialState(undefined, { location });
    expect(output).toStrictEqual({
      actionType: undefined,
      location: { current: location, key: 'prefix/', path: '' },
    });
  });

  it('returns the expected state when `defaultValue` is `undefined` and provided `legacyProps` with an empty `location`', () => {
    const output = getInitialState(undefined, { location: undefined });
    expect(output).toStrictEqual(DEFAULT_STATE);
  });

  it('returns the expected state when both `defaultValue` and `legacyProps` are explicitly `undefined``', () => {
    const output = getInitialState(undefined, undefined);
    expect(output).toStrictEqual(DEFAULT_STATE);
  });
});

describe('getLocationData', () => {
  it('returns the expected value when value is `undefined`', () => {
    const output = getLocationData();

    expect(output).toBeUndefined();
  });

  it('returns the expected value when value is a fully formed location', () => {
    const output = getLocationData(location);

    expect(output).toStrictEqual(location);
  });

  it('provides default values for `id` and `type` when not included in value', () => {
    const value: LocationValue = {
      bucket: 'bucket',
      permissions: ['delete', 'get', 'list', 'write'],
      prefix: 'prefix/',
    };
    const output = getLocationData(value);

    expect(output?.type).toBe('PREFIX');
    expect(output?.id).toBe('intentionally-static-test-id');
  });
});

describe('getState', () => {
  it('returns the expected state when value is `undefined`', () => {
    const output = getState(undefined);

    expect(output).toBe(DEFAULT_STATE);
  });

  it('returns the expected state when value is `null`', () => {
    const output = getState(null);

    expect(output).toBe(DEFAULT_STATE);
  });

  it('returns the expected state when value includes a `location` resolving to `undefined`', () => {
    const output = getState({ location: undefined });

    expect(output).toBe(DEFAULT_STATE);
  });

  it('returns the expected state when value includes a `location` missing `id` and `type` values', () => {
    const output = getState({
      location: {
        bucket: 'bucket',
        permissions: ['delete', 'get', 'list', 'write'],
        prefix: 'prefix/',
      },
    });

    expect(output).toStrictEqual({
      actionType: undefined,
      location: {
        current: {
          ...location,
          id: 'intentionally-static-test-id',
          type: 'PREFIX',
        },
        key: 'prefix/',
        path: '',
      },
    });
  });
});

describe('parseLocationType', () => {
  it('returns a `type` of `PREFIX` as expected', () => {
    const output = parseLocationType({ ...location, prefix: 'some-prefix/' });
    expect(output).toBe('PREFIX');
  });

  it('returns a `type` of `OBJECT` as expected', () => {
    const output = parseLocationType({
      ...location,
      prefix: 'some-object-key',
    });
    expect(output).toBe('OBJECT');
  });

  it('returns a `type` of `BUCKET` as expected', () => {
    const output = parseLocationType({ ...location, prefix: '' });
    expect(output).toBe('BUCKET');
  });
});
