import { SortDirection } from '../../../composables/DataTable';
import { compareNumberData } from '../compareNumberData';

describe('compareNumberData', () => {
  const emptyContent = { type: 'number' as const, key: '', content: {} };
  const a = { ...emptyContent, content: { value: 1 } };
  const b = { ...emptyContent, content: { value: 2 } };
  const getComparisonResults = (direction: SortDirection) => [
    compareNumberData(emptyContent, emptyContent, direction),
    compareNumberData(emptyContent, b, direction),
    compareNumberData(a, emptyContent, direction),
    compareNumberData(a, a, direction),
    compareNumberData(a, b, direction),
    compareNumberData(b, a, direction),
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
