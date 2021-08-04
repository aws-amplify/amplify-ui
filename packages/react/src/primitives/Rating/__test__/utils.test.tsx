import { isIconEmpty, isIconFilled, isIconMixed } from '../utils';

describe('isIconFilled', () => {
  /**
   * This is a utility function for the Rating component. Given the icon index and the rating
   * value of the component, the function will return a boolean value describing if this icon
   * should be a filled rating icon.
   */

  it('should return true for index values 1 and 2 if the rating value is 2.5', () => {
    expect(isIconFilled(1, 2.5)).toBe(true);
    expect(isIconFilled(2, 2.5)).toBe(true);
  });

  it('should return false for index values 3, 4, and 5 if the rating value is 2.5', () => {
    expect(isIconFilled(3, 2.5)).toBe(false);
    expect(isIconFilled(4, 2.5)).toBe(false);
    expect(isIconFilled(5, 2.5)).toBe(false);
  });

  it('should return true for 2 and false for 3 if the rating value is 2', () => {
    expect(isIconFilled(2, 2)).toBe(true);
    expect(isIconFilled(3, 2)).toBe(false);
  });
});

describe('isIconEmpty', () => {
  /**
   * This is a utility function for the Rating component. Given the icon index and the rating
   * value of the component, the function will return a boolean value describing if this icon
   * should be an empty rating icon
   */

  it('should return true for index values 4 and 5 if the rating value is 2.5', () => {
    expect(isIconEmpty(4, 2.5)).toBe(true);
    expect(isIconEmpty(5, 2.5)).toBe(true);
  });

  it('should return false for index values 1, 2, and 3 if the rating value is 2.5', () => {
    expect(isIconEmpty(1, 2.5)).toBe(false);
    expect(isIconEmpty(2, 2.5)).toBe(false);
    expect(isIconEmpty(3, 2.5)).toBe(false);
  });

  it('should return true for 3 and false for 2 if the rating value is 2', () => {
    expect(isIconEmpty(3, 2)).toBe(true);
    expect(isIconEmpty(2, 2)).toBe(false);
  });
});

describe('isIconMixed', () => {
  /**
   * This is a utility function for the Rating component. Given the icon index and the rating
   * value of the component, the function will return a boolean value describing if this icon
   * should be a mixed rating icon (partially full and partially empty)
   */
  it('should return true for index value 3 if the rating value is 2.5', () => {
    expect(isIconMixed(3, 2.5)).toBe(true);
  });

  it('should return false for index values 1, 2, 4, and 5 if the rating value is 2.5', () => {
    expect(isIconMixed(1, 2.5)).toBe(false);
    expect(isIconMixed(2, 2.5)).toBe(false);
    expect(isIconMixed(4, 2.5)).toBe(false);
    expect(isIconMixed(5, 2.5)).toBe(false);
  });
});
