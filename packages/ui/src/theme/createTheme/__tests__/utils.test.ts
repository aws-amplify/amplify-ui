import {
  referenceValue,
  isDesignToken,
  cssValue,
  cssNameTransform,
  usesReference,
  flattenProperties,
  deepExtend,
} from '../utils';

const sortBy = (key) => {
  return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
};

describe('theme utils', () => {
  describe('isDesignToken', () => {
    it('should return true for a valid design token object', () => {
      const token = { value: '#FFFFFF' };
      expect(isDesignToken(token)).toBe(true);
    });

    it('should return false for a non-design token object', () => {
      const token = { color: '#FFFFFF' };
      expect(isDesignToken(token)).toBe(false);
    });

    it('should return false for a non-object', () => {
      expect(isDesignToken('value')).toBe(false);
    });
  });

  describe('isReferenceValue', () => {
    it('should return the value if there is no reference', () => {
      expect(referenceValue('#FFFFFF')).toBe('#FFFFFF');
    });

    it('should return a CSS variable if there is a reference', () => {
      expect(referenceValue('{colors.red.10}')).toBe(
        'var(--amplify-colors-red-10)'
      );
    });

    it('should empty string for non  value', () => {
      expect(referenceValue()).toBe('');
    });
  });

  describe('cssValue', () => {
    it('should pass through raw values', () => {
      expect(cssValue({ value: 'red' })).toEqual('red');
    });

    it('should turn references into CSS variables', () => {
      expect(cssValue({ value: '{colors.red.value}' })).toEqual(
        'var(--amplify-colors-red)'
      );
    });

    it('returns a reference value as a CSS variable', () => {
      expect(cssValue({ value: '{colors.text}' })).toBe(
        'var(--amplify-colors-text)'
      );
    });

    it('returns a non-reference value as is', () => {
      expect(cssValue({ value: '10px' })).toBe('10px');
      expect(cssValue({ value: 123 })).toBe(123);
      expect(cssValue({ value: null })).toBe(null);
    });

    it('returns a set of shadow properties as a CSS value', () => {
      expect(
        cssValue({
          value:
            'box-shadow: {spacing.small.value} {spacing.medium.value} {radii.large.value} {colors.primary.value}; opacity: 0.8;',
        })
      ).toBe(
        'var(--amplify-box-shadow-spacing-small-spacing-medium-value-radii-large-value-colors-primary-value-opacity-0-8)'
      );
    });
  });

  describe('cssNameTransform', () => {
    it('should kebab/param-case an array of strings with the prefix', () => {
      expect(cssNameTransform({ path: ['a', 'b', 'c'] })).toEqual(
        'amplify-a-b-c'
      );
    });

    it('should handle spacing/deliminting characters in the path', () => {
      expect(cssNameTransform({ path: ['a-b', 'c'] })).toEqual('amplify-a-b-c');
      expect(cssNameTransform({ path: ['a_b', 'c'] })).toEqual('amplify-a-b-c');
      expect(cssNameTransform({ path: ['fontPrimary', 'c'] })).toEqual(
        'amplify-font-primary-c'
      );
    });

    it('should transform a single cssName to kebab case', () => {
      expect(cssNameTransform({ path: ['myVar'] })).toEqual('amplify-my-var');
    });

    it('should handle nested paths', () => {
      expect(
        cssNameTransform({ path: ['theme', 'colors', 'primary'] })
      ).toEqual('amplify-theme-colors-primary');
    });
  });

  /**
   * Unit tests for copied style dictionary functions
   */

  // https://github.com/amzn/style-dictionary/blob/main/__tests__/utils/flattenProperties.test.js
  describe('flattenProperties', () => {
    it('should return an empty array', () => {
      const ret = flattenProperties({});
      expect(ret).toEqual([]);
    });

    it('should return the same array', () => {
      const to_ret = [];
      const ret = flattenProperties({}, to_ret);
      expect(ret).toBe(ret);
    });

    it('should return leaf node values as an array', () => {
      const properties = {
        black: {
          value: '#000000',
        },
        white: {
          value: '#FFFFFF',
        },
      };

      const expected_ret = [properties.black, properties.white];

      const sortedExpectedRet = expected_ret.sort(sortBy('value'));
      const ret = flattenProperties(properties);
      const sortedRet = ret.sort(sortBy('value'));
      expect(sortedRet).toEqual(sortedExpectedRet);
    });

    it('should return nested leaf node values as an array', () => {
      const properties = {
        color: {
          black: {
            value: '#000000',
          },
          white: {
            value: '#FFFFFF',
          },
        },
      };

      const expected_ret = [properties.color.black, properties.color.white];

      const sortedExpectedRet = expected_ret.sort(sortBy('value'));
      const ret = flattenProperties(properties);
      const sortedRet = ret.sort(sortBy('value'));
      expect(sortedRet).toEqual(sortedExpectedRet);
    });
  });

  // https://github.com/amzn/style-dictionary/blob/main/__tests__/utils/reference/usesReference.test.js
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

  // https://github.com/amzn/style-dictionary/blob/main/__tests__/utils/deepExtend.test.js
  describe('deepExtend', () => {
    it('should return an object', () => {
      var test = deepExtend();
      expect(typeof test).toBe('object');
    });

    it('should override properties from right to left', () => {
      var test = deepExtend([{ foo: 'bar' }, { foo: 'baz' }]);
      expect(test).toHaveProperty('foo', 'baz');

      var test2 = deepExtend([{ foo: 'bar' }, { foo: 'baz' }, { foo: 'blah' }]);
      expect(test2).toHaveProperty('foo', 'blah');
    });

    it('overrides nested properties', () => {
      var test = deepExtend([{ foo: { foo: 'bar' } }, { foo: { foo: 'baz' } }]);
      expect(test).toHaveProperty('foo.foo', 'baz');

      var test2 = deepExtend([
        { foo: { foo: 'bar' } },
        { foo: { foo: 'baz' } },
        { foo: { foo: 'blah' } },
      ]);
      expect(test2).toHaveProperty('foo.foo', 'blah');
    });

    it('properly merges nested properties', () => {
      var test = deepExtend([{ foo: { bar: 'bar' } }, { foo: { baz: 'baz' } }]);
      expect(test).toHaveProperty('foo.baz', 'baz');
      expect(test).toHaveProperty('foo.bar', 'bar');

      var test2 = deepExtend([
        { foo: { bar: 'bar' } },
        { foo: { baz: 'baz' } },
        { foo: { blah: 'blah' } },
      ]);
      expect(test2).toHaveProperty('foo.baz', 'baz');
      expect(test2).toHaveProperty('foo.bar', 'bar');
      expect(test2).toHaveProperty('foo.blah', 'blah');
    });

    it("shouldn't fail loudly if it is a normal deep extend", () => {
      var test = deepExtend(
        [{ foo: { bar: 'bar' } }, { foo: { baz: 'baz' } }],
        function () {}
      );
      expect(test).toHaveProperty('foo.baz', 'baz');
      expect(test).toHaveProperty('foo.bar', 'bar');
    });

    describe('collision detection', () => {
      it('should call the collision function if a collision happens', () => {
        expect(
          deepExtend.bind(
            null,
            [{ foo: { bar: 'bar' } }, { foo: { bar: 'baz' } }],
            function () {
              throw new Error('danger danger. high voltage.');
            }
          )
        ).toThrow('danger danger. high voltage.');
      });

      it('the collision function should have the proper arguments', () => {
        var test = deepExtend(
          [{ foo: { bar: 'bar' } }, { foo: { bar: 'baz' } }],
          function (opts) {
            expect(opts).toHaveProperty('target.bar', 'bar');
            expect(opts).toHaveProperty('copy.bar', 'baz');
            expect(opts.path[0]).toBe('foo');
            expect(opts).toHaveProperty('key', 'bar');
          }
        );
        expect(test).toHaveProperty('foo.bar', 'baz');
      });
    });
  });
});
