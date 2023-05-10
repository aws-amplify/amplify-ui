import { cssValue } from '../utils';

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
