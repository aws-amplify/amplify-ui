import { referenceValue } from '../referenceValue';

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
