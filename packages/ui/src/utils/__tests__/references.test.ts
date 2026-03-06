import {
  getName,
  getPathFromName,
  resolveReference,
  usesReference,
} from '../references';

const dictionary = {
  color: {
    palette: {
      neutral: {
        0: { value: '#ffffff' },
        5: { value: '#f2f3f4' },
      },
    },
    background: {
      primary: { value: '{color.palette.neutral.0.value}' },
    },
  },
  arr: ['one', 'two'],
};

describe('resolveReference()', () => {
  it(`returns undefined for non-strings`, () => {
    // @ts-expect-error testing invalid input
    expect(resolveReference(42, dictionary)).toBe(undefined);
  });

  it(`returns undefined if it does not find the path in the object`, () => {
    expect(resolveReference(['color', 'foo'], dictionary)).toBe(undefined);
    expect(resolveReference(['color', 'foo', 'bar'], dictionary)).toBe(
      undefined
    );
  });

  it(`returns the part of the object if referenced path exists`, () => {
    expect(
      resolveReference(
        ['color', 'palette', 'neutral', '0', 'value'],
        dictionary
      )
    ).toEqual(dictionary.color.palette.neutral['0'].value);
    expect(resolveReference(['color'], dictionary)).toEqual(dictionary.color);
  });

  it(`works with arrays`, () => {
    expect(resolveReference(['arr'], dictionary)).toEqual(dictionary.arr);
  });

  it(`works with array indices`, () => {
    expect(resolveReference(['arr', '0'], dictionary)).toEqual(
      dictionary.arr[0]
    );
  });
});

describe('usesReference()', () => {
  it(`returns false for non-strings`, () => {
    expect(usesReference(42)).toBe(false);
  });

  it(`returns false if value uses no reference`, () => {
    expect(usesReference('foo.bar')).toBe(false);
  });

  it(`returns true if value is a reference`, () => {
    expect(usesReference('{foo.bar}')).toBe(true);
  });

  it(`should return true if value uses a reference`, () => {
    expect(usesReference('baz {foo.bar}')).toBe(true);
  });

  it(`returns true if an object uses a reference`, () => {
    expect(usesReference({ foo: '{bar}' })).toBe(true);
  });

  it(`returns false if an object doesn't have a reference`, () => {
    expect(usesReference({ foo: 'bar' })).toBe(false);
  });

  it(`returns true if a nested object has a reference`, () => {
    expect(usesReference({ foo: { bar: '{bar}' } })).toBe(true);
  });

  it(`returns true if an array uses a reference`, () => {
    expect(usesReference(['foo', '{bar}'])).toBe(true);
  });

  it(`returns false if an array doesn't use a reference`, () => {
    expect(usesReference(['foo', 'bar'])).toBe(false);
  });
});

describe('getPathFromName()', () => {
  it('should split pathName using default separator', () => {
    const pathName = 'foo.bar.baz';
    const result = getPathFromName(pathName);
    expect(result).toEqual(['foo', 'bar', 'baz']);
  });

  it('should return array with single element if no separator is found', () => {
    const pathName = 'foobar';
    const result = getPathFromName(pathName);
    expect(result).toEqual(['foobar']);
  });

  it('should throw an error if pathName is not a string', () => {
    // @ts-expect-error testing invalid input
    expect(() => getPathFromName(123)).toThrow(
      'Getting path from name failed. Name must be a string'
    );
  });

  it('should use default separator if options are not provided', () => {
    const pathName = 'a.b.c';
    const result = getPathFromName(pathName);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should return empty array for empty string input', () => {
    const pathName = '';
    const result = getPathFromName(pathName);
    expect(result).toEqual(['']);
  });
});

describe('getName', () => {
  test('should join array elements using default separator', () => {
    const path = ['foo', 'bar', 'baz'];
    const result = getName(path);
    expect(result).toBe('foo.bar.baz');
  });

  test('should return an empty string for an empty array', () => {
    const path = [];
    const result = getName(path);
    expect(result).toBe('');
  });

  test('should throw an error if path is not an array', () => {
    // @ts-expect-error testing invalid input
    expect(() => getName('not an array')).toThrow(
      'Getting name for path failed. Path must be an array'
    );
  });

  test('should throw an error if path is undefined or null', () => {
    expect(() => getName(null)).toThrow(
      'Getting name for path failed. Path must be an array'
    );
    expect(() => getName(undefined)).toThrow(
      'Getting name for path failed. Path must be an array'
    );
  });

  test('should join array with one element correctly', () => {
    const path = ['foo'];
    const result = getName(path);
    expect(result).toBe('foo');
  });
});
