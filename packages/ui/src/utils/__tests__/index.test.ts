import {
  areEmptyArrays,
  areEmptyObjects,
  capitalize,
  has,
  isEmpty,
  isMap,
  isNil,
  isObject,
  isSet,
  isString,
  isUndefined,
} from '..';

const validArrays = [[], [], [], []];
const invalidArrays = [[7]];

const validObjects = [{}, {}];
const invalidObjects = [{ id: 7 }, {}, {}];

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

describe('isSet', () => {
  it('should return `true` for sets', () => {
    expect(isSet(new Set())).toStrictEqual(true);
  });

  it('should return `false` for non-sets', () => {
    expect(isSet('')).toStrictEqual(false);
    expect(isSet(null)).toStrictEqual(false);
    expect(isSet(undefined)).toStrictEqual(false);
    expect(isSet(true)).toStrictEqual(false);
    expect(isSet(0)).toStrictEqual(false);
    expect(isSet([1, 2, 3])).toStrictEqual(false);
    expect(isSet(new WeakSet())).toStrictEqual(false);
    expect(isSet(new Map())).toStrictEqual(false);
    expect(isSet(new Array())).toStrictEqual(false);
  });
});

describe('isMap', () => {
  it('should return `true` for maps', () => {
    expect(isMap(new Map())).toStrictEqual(true);
  });

  it('should return `false` for non-maps', () => {
    expect(isMap('')).toStrictEqual(false);
    expect(isMap(null)).toStrictEqual(false);
    expect(isMap(undefined)).toStrictEqual(false);
    expect(isMap(true)).toStrictEqual(false);
    expect(isMap(0)).toStrictEqual(false);
    expect(isMap([1, 2, 3])).toStrictEqual(false);
    expect(isMap(new WeakMap())).toStrictEqual(false);
    expect(isMap(new Set())).toStrictEqual(false);
    expect(isMap(new Array())).toStrictEqual(false);
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

describe('isNil', () => {
  it('should return `true` for nullish values', function () {
    expect(isNil(null)).toStrictEqual(true);
    expect(isNil(undefined)).toStrictEqual(true);
    expect(isNil(void 0)).toStrictEqual(true);
  });

  it('should return `false` for non-nullish values', function () {
    expect(isNil(true)).toStrictEqual(false);
    expect(isNil('')).toStrictEqual(false);
    expect(isNil(0)).toStrictEqual(false);
    expect(isNil([1, 2, 3])).toStrictEqual(false);
    expect(isNil(new Number(0))).toStrictEqual(false);
    expect(isNil(new String(''))).toStrictEqual(false);
    expect(isNil(new Date())).toStrictEqual(false);
    expect(isNil(new Error())).toStrictEqual(false);
    expect(isNil({})).toStrictEqual(false);
    expect(isNil(NaN)).toStrictEqual(false);
  });
});

describe('isEmpty', () => {
  it('should return `true` for empty values', function () {
    expect(isEmpty(null)).toStrictEqual(true);
    expect(isEmpty(undefined)).toStrictEqual(true);
    expect(isEmpty(true)).toStrictEqual(true);
    expect(isEmpty(void 0)).toStrictEqual(true);
    expect(isEmpty(NaN)).toStrictEqual(true);
    expect(isEmpty(0)).toStrictEqual(true);
    expect(isEmpty('')).toStrictEqual(true);
    expect(isEmpty([])).toStrictEqual(true);
    expect(isEmpty(new Number(0))).toStrictEqual(true);
    expect(isEmpty(new String(''))).toStrictEqual(true);
    expect(isEmpty(new Date())).toStrictEqual(true);
    expect(isEmpty(new Array())).toStrictEqual(true);
    expect(isEmpty(new Map())).toStrictEqual(true);
    expect(isEmpty(new Set())).toStrictEqual(true);
    expect(isEmpty(new Error())).toStrictEqual(true);
    expect(isEmpty({})).toStrictEqual(true);
    expect(isEmpty(new Map([]))).toStrictEqual(true);
    expect(isEmpty(new Set([]))).toStrictEqual(true);
  });

  it('should return `false` for non-empty values', function () {
    expect(isEmpty([1, 2, 3])).toStrictEqual(false);
    expect(isEmpty('test')).toStrictEqual(false);
    expect(isEmpty({ test: 1 })).toStrictEqual(false);
    expect(isEmpty({ length: 0 })).toStrictEqual(false);
    expect(isEmpty({ size: 0 })).toStrictEqual(false);
    expect(
      isEmpty(
        new Map([
          ['key1', 'value1'],
          ['key2', 'value2'],
        ])
      )
    ).toStrictEqual(false);
  });
  expect(isEmpty(new Set([1, 2, 3]))).toStrictEqual(false);
  expect(isEmpty(new Array([]))).toStrictEqual(false);
  expect(isEmpty(new Array([1, 2, 3]))).toStrictEqual(false);
});

describe('areEmptyArrays', () => {
  it.each([
    [true, validArrays],
    [false, invalidArrays],
  ])('returns %s as expected', (expected, input) => {
    const output = areEmptyArrays(...input);

    expect(output).toBe(expected);
  });
});

describe('areEmptyObjects', () => {
  it.each([
    [true, validObjects],
    [false, invalidObjects],
  ])('returns %s as expected', (expected, input) => {
    const output = areEmptyObjects(...input);

    expect(output).toBe(expected);
  });
});

describe('has', () => {
  it('should return `true` for objects that have the specified key', function () {
    expect(has({ a: 1 }, 'a')).toStrictEqual(true);
  });

  it('should return `false` for objects that do not have the specified key', function () {
    expect(has({ a: 1 }, 'b')).toStrictEqual(false);
  });

  it('should return `false` for nullish objects', function () {
    expect(has(null, 'a')).toStrictEqual(false);
    expect(has(undefined, 'a')).toStrictEqual(false);
  });
});
