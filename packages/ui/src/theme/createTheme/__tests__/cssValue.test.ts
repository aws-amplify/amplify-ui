import { cssValue } from '../cssValue';

describe('@aws-amplify/ui', () => {
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
});
