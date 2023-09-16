import { isDesignToken } from '../isDesignToken';

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
