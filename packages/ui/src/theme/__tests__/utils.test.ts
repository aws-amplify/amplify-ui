import { cssNameTransform, cssValue, isDesignToken } from '../utils';

describe('cssValue', () => {
  test('returns a reference value as a CSS variable', () => {
    expect(cssValue({ value: '{colors.text}' })).toBe(
      'var(--amplify-colors-text)'
    );
  });

  test('returns a non-reference value as is', () => {
    expect(cssValue({ value: '10px' })).toBe('10px');
    expect(cssValue({ value: 123 })).toBe(123);
    expect(cssValue({ value: null })).toBe(null);
  });

  test('returns a set of shadow properties as a CSS value', () => {
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

describe('cssNameTransform', () => {
  it('should transform a single cssName to kebab case', () => {
    expect(cssNameTransform({ path: ['myVar'] })).toEqual('amplify-my-var');
  });

  it('should handle nested paths', () => {
    expect(cssNameTransform({ path: ['theme', 'colors', 'primary'] })).toEqual(
      'amplify-theme-colors-primary'
    );
  });
});
