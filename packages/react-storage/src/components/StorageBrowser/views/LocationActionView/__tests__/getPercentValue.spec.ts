import { getPercentValue } from '../getPercentValue';

describe('getPercentValue', () => {
  it('calculates the percentage of a number', () => {
    expect(getPercentValue(0.01)).toBe(1);
    expect(getPercentValue(0.5)).toBe(50);
    expect(getPercentValue(1)).toBe(100);
  });
});
