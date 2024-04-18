import {
  referenceValue,
  isDesignToken,
  cssValue,
  cssNameTransform,
} from '../utils';

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
});
