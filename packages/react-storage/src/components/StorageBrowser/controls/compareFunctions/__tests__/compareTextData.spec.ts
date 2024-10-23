import { SortDirection } from '../../../composables/DataTable';
import { compareTextData } from '../compareTextData';

describe('compareTextData', () => {
  const emptyContent = { type: 'text' as const, content: {} };
  const a = { ...emptyContent, content: { text: 'a' } };
  const b = { ...emptyContent, content: { text: 'b' } };
  const getComparisonResults = (direction: SortDirection) => [
    compareTextData(emptyContent, emptyContent, direction),
    compareTextData(emptyContent, b, direction),
    compareTextData(a, emptyContent, direction),
    compareTextData(a, a, direction),
    compareTextData(a, b, direction),
    compareTextData(b, a, direction),
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
