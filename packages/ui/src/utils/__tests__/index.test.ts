import {
  areEmptyArrays,
  areEmptyObjects,
  capitalize,
  has,
  isEmpty,
  isFunction,
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
    expect(isObject(new Number(0))).toBe(true);
    expect(isObject(new String(''))).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(new Error())).toBe(true);
    expect(isObject({})).toBe(true);
    expect(isObject({ test: 1 })).toBe(true);
    expect(isObject(Object(false))).toBe(true);
    expect(isObject(Object(0))).toBe(true);
    expect(isObject(Object('test'))).toBe(true);
  });

  it('should return `false` for non-objects', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(0)).toBe(false);
    expect(isObject('test')).toBe(false);
    expect(isObject([1, 2, 3])).toBe(false);
    expect(isObject(() => {})).toBe(false);
  });
});

describe('isString', () => {
  it('should return `true` for strings', () => {
    expect(isString('')).toBe(true);
    expect(isString('test')).toBe(true);
    expect(isString(new String('test'))).toBe(true);
  });

  it('should return `false` for non-strings', () => {
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(0)).toBe(false);
    expect(isString([1, 2, 3])).toBe(false);
  });
});

describe('isSet', () => {
  it('should return `true` for sets', () => {
    expect(isSet(new Set())).toBe(true);
  });

  it('should return `false` for non-sets', () => {
    expect(isSet('')).toBe(false);
    expect(isSet(null)).toBe(false);
    expect(isSet(undefined)).toBe(false);
    expect(isSet(true)).toBe(false);
    expect(isSet(0)).toBe(false);
    expect(isSet([1, 2, 3])).toBe(false);
    expect(isSet(new WeakSet())).toBe(false);
    expect(isSet(new Map())).toBe(false);
    expect(isSet(new Array())).toBe(false);
  });
});

describe('isMap', () => {
  it('should return `true` for maps', () => {
    expect(isMap(new Map())).toBe(true);
  });

  it('should return `false` for non-maps', () => {
    expect(isMap('')).toBe(false);
    expect(isMap(null)).toBe(false);
    expect(isMap(undefined)).toBe(false);
    expect(isMap(true)).toBe(false);
    expect(isMap(0)).toBe(false);
    expect(isMap([1, 2, 3])).toBe(false);
    expect(isMap(new WeakMap())).toBe(false);
    expect(isMap(new Set())).toBe(false);
    expect(isMap(new Array())).toBe(false);
  });
});

describe('isUndefined', () => {
  it('should return `true` for undefined values', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(void 0)).toBe(true);
  });

  it('should return `false` for non-undefined values', () => {
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined([1, 2, 3])).toBe(false);
    expect(isUndefined(new Number(0))).toBe(false);
    expect(isUndefined(new String(''))).toBe(false);
    expect(isUndefined(new Date())).toBe(false);
    expect(isUndefined(new Error())).toBe(false);
    expect(isUndefined({})).toBe(false);
  });
});

describe('isNil', () => {
  it('should return `true` for nullish values', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(void 0)).toBe(true);
  });

  it('should return `false` for non-nullish values', () => {
    expect(isNil(true)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil(0)).toBe(false);
    expect(isNil([1, 2, 3])).toBe(false);
    expect(isNil(new Number(0))).toBe(false);
    expect(isNil(new String(''))).toBe(false);
    expect(isNil(new Date())).toBe(false);
    expect(isNil(new Error())).toBe(false);
    expect(isNil({})).toBe(false);
    expect(isNil(NaN)).toBe(false);
  });
});

describe('isEmpty', () => {
  it('should return `true` for empty values', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(void 0)).toBe(true);
    expect(isEmpty(NaN)).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(new Number(0))).toBe(true);
    expect(isEmpty(new String(''))).toBe(true);
    expect(isEmpty(new Date())).toBe(true);
    expect(isEmpty(new Array())).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty(new Error())).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(new Map([]))).toBe(true);
    expect(isEmpty(new Set([]))).toBe(true);
  });

  it('should return `false` for non-empty values', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty('test')).toBe(false);
    expect(isEmpty({ test: 1 })).toBe(false);
    expect(isEmpty({ length: 0 })).toBe(false);
    expect(isEmpty({ size: 0 })).toBe(false);
    expect(
      isEmpty(
        new Map([
          ['key1', 'value1'],
          ['key2', 'value2'],
        ])
      )
    ).toBe(false);
    expect(isEmpty(new Set([1, 2, 3]))).toBe(false);
    expect(isEmpty(new Array([]))).toBe(false);
    expect(isEmpty(new Array([1, 2, 3]))).toBe(false);
  });
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
  it('should return `true` for objects that have the specified key', () => {
    expect(has({ a: 1 }, 'a')).toBe(true);
  });

  it('should return `false` for objects that do not have the specified key', () => {
    expect(has({ a: 1 }, 'b')).toBe(false);
  });

  it('should return `false` for nullish objects', () => {
    expect(has(null, 'a')).toBe(false);
    expect(has(undefined, 'a')).toBe(false);
  });

  it('should return `false` for booleans passed as the value param', () => {
    expect(has(false, 'a')).toBe(false);
    expect(has(true, 'a')).toBe(false);
  });

  it('should return `false` when the value param is an array', () => {
    expect(has([1, 2, 3], 'a')).toBe(false);
    expect(has([], 'a')).toBe(false);
  });
});

describe('isFunction', () => {
  it('returns `true` when the value param is a function', () => {
    expect(isFunction(() => null)).toBe(true);
  });

  it.each(['string', null, undefined, true, false])(
    'returns `false` when the value param is %s',
    (value) => {
      expect(isFunction(value)).toBe(false);
    }
  );
});
