import { renderHook } from '@testing-library/react-hooks';
import { useSearch } from '../useSearch';

describe('useSearch', () => {
  it('returns the expected values on initial call', () => {
    const onSearch = jest.fn();
    const { result } = renderHook(() => useSearch({ onSearch }));

    const { current } = result ?? {};

    expect(current?.searchQuery).toBe('');
    expect(typeof current?.onSearchSubmit).toBe('function');
    expect(typeof current?.resetSearch).toBe('function');
    expect(typeof current?.onSearchQueryChange).toBe('function');
  });
});
