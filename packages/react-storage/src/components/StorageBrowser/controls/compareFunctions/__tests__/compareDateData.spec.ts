import { SortDirection } from '../../../composables/DataTable';
import { compareDateData } from '../compareDateData';

describe('compareDateData', () => {
  const emptyContent = { type: 'date' as const, content: {} };
  const a = { ...emptyContent, content: { date: new Date(1600387200000) } };
  const b = { ...emptyContent, content: { date: new Date(1702339200000) } };
  const getComparisonResults = (direction: SortDirection) => [
    compareDateData(emptyContent, emptyContent, direction),
    compareDateData(emptyContent, b, direction),
    compareDateData(a, emptyContent, direction),
    compareDateData(a, a, direction),
    compareDateData(a, b, direction),
    compareDateData(b, a, direction),
  ];

  it('should compare date data in ascending direction', () => {
    const [
      bothAreUndefined,
      aIsUndefined,
      bIsUndefined,
      aEqualsB,
      aIsBeforeB,
      bIsBeforeA,
    ] = getComparisonResults('ascending');
    expect(bothAreUndefined).toBe(0);
    expect(aIsUndefined).toBeGreaterThan(0);
    expect(bIsUndefined).toBeLessThan(0);
    expect(aEqualsB).toBe(0);
    expect(aIsBeforeB).toBeLessThan(0);
    expect(bIsBeforeA).toBeGreaterThan(0);
  });

  it('should compare date data in descending direction', () => {
    const [
      bothAreUndefined,
      aIsUndefined,
      bIsUndefined,
      aEqualsB,
      aIsBeforeB,
      bIsBeforeA,
    ] = getComparisonResults('descending');
    expect(bothAreUndefined).toBe(0);
    expect(aIsUndefined).toBeLessThan(0);
    expect(bIsUndefined).toBeGreaterThan(0);
    expect(aEqualsB).toBe(0);
    expect(aIsBeforeB).toBeGreaterThan(0);
    expect(bIsBeforeA).toBeLessThan(0);
  });
});
