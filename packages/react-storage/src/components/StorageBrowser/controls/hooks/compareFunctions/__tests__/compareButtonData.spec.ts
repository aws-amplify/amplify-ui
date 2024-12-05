import { SortDirection } from '../../../../composables/DataTable';
import { compareButtonData } from '../compareButtonData';

describe('compareButtonData', () => {
  const emptyContent = { type: 'button' as const, content: {} };
  const a = { ...emptyContent, content: { label: 'a' } };
  const b = { ...emptyContent, content: { label: 'b' } };
  const getComparisonResults = (direction: SortDirection) => [
    compareButtonData(emptyContent, emptyContent, direction),
    compareButtonData(emptyContent, b, direction),
    compareButtonData(a, emptyContent, direction),
    compareButtonData(a, a, direction),
    compareButtonData(a, b, direction),
    compareButtonData(b, a, direction),
  ];

  it('should compare button data in ascending direction', () => {
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

  it('should compare button data in descending direction', () => {
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
