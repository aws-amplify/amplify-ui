import { capitalize, isObject, isString, isUndefined } from '..';

describe('capitalize', () => {
  it('capitalizes the given value', () => {
    const value = 'value';
    const expected = 'Value';

    expect(capitalize(value)).toBe(expected);
  });

  it('returns an empty string when given an empty string', () => {
    const value = '';
    const expected = '';

    expect(capitalize(value)).toBe(expected);
  });

  it.each([null, undefined])(
    'returns an empty string when called with %s',
    (value) => {
      const expected = '';
      expect(capitalize(value as unknown as string)).toBe(expected);
    }
  );
});

describe('isObject', () => {
  it('should return `true` for objects', () => {
    expect(isObject(new Number(0))).toStrictEqual(true);
    expect(isObject(new String(''))).toStrictEqual(true);
    expect(isObject(new Date())).toStrictEqual(true);
    expect(isObject(new Error())).toStrictEqual(true);
    expect(isObject({})).toStrictEqual(true);
    expect(isObject({ test: 1 })).toStrictEqual(true);
    expect(isObject(Object(false))).toStrictEqual(true);
    expect(isObject(Object(0))).toStrictEqual(true);
    expect(isObject(Object('test'))).toStrictEqual(true);
  });

  it('should return `false` for non-objects', () => {
    expect(isObject(null)).toStrictEqual(false);
    expect(isObject(undefined)).toStrictEqual(false);
    expect(isObject(true)).toStrictEqual(false);
    expect(isObject(0)).toStrictEqual(false);
    expect(isObject('test')).toStrictEqual(false);
    expect(isObject([1, 2, 3])).toStrictEqual(false);
    expect(isObject(() => {})).toStrictEqual(false);
  });
});

describe('isString', () => {
  it('should return `true` for strings', () => {
    expect(isString('')).toStrictEqual(true);
    expect(isString('test')).toStrictEqual(true);
    expect(isString(new String('test'))).toStrictEqual(true);
  });

  it('should return `false` for non-strings', () => {
    expect(isString(null)).toStrictEqual(false);
    expect(isString(undefined)).toStrictEqual(false);
    expect(isString(true)).toStrictEqual(false);
    expect(isString(0)).toStrictEqual(false);
    expect(isString([1, 2, 3])).toStrictEqual(false);
  });
});

describe('isUndefined', () => {
  it('should return `true` for undefined values', function () {
    expect(isUndefined(undefined)).toStrictEqual(true);
    expect(isUndefined(void 0)).toStrictEqual(true);
  });

  it('should return `false` for non-undefined values', function () {
    expect(isUndefined(null)).toStrictEqual(false);
    expect(isUndefined(true)).toStrictEqual(false);
    expect(isUndefined('')).toStrictEqual(false);
    expect(isUndefined(0)).toStrictEqual(false);
    expect(isUndefined([1, 2, 3])).toStrictEqual(false);
    expect(isUndefined(new Number(0))).toStrictEqual(false);
    expect(isUndefined(new String(''))).toStrictEqual(false);
    expect(isUndefined(new Date())).toStrictEqual(false);
    expect(isUndefined(new Error())).toStrictEqual(false);
    expect(isUndefined({})).toStrictEqual(false);
  });
});
