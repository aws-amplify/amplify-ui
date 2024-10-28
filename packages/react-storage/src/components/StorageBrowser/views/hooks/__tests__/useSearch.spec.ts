import { renderHook, act } from '@testing-library/react-hooks';
import { useSearch, InitialSearchValues } from '../useSearch';

const items = [
  { name: 'File 1', type: 'document' },
  { name: 'File 2', type: 'image' },
  { name: 'File 3', type: 'document' },
];

jest.useFakeTimers();

describe('useSearch Hook', () => {
  it('should initialize with provided search term and return all items initially', () => {
    const initialValues: InitialSearchValues<(typeof items)[0]> = {
      searchTerm: '',
      searchKey: 'name',
    };
    const { result } = renderHook(() =>
      useSearch({ initialValues, items, onSearch: jest.fn() })
    );

    // Initial search term should be empty
    expect(result.current.searchTerm).toBe('');
    // Should return all items initially
    expect(result.current.filteredItems).toEqual(items);
  });

  it('should filter items based on the search term', () => {
    const initialValues: InitialSearchValues<(typeof items)[0]> = {
      searchTerm: 'File 1',
      searchKey: 'name',
    };
    const { result } = renderHook(() =>
      useSearch({ initialValues, items, onSearch: jest.fn() })
    );

    expect(result.current.filteredItems).toEqual([
      { name: 'File 1', type: 'document' },
    ]);
  });

  it('should update search term and filtered items when handleSearch is called', () => {
    const initialValues: InitialSearchValues<(typeof items)[0]> = {
      searchTerm: '',
      searchKey: 'name',
      debounceDelay: 50,
    };
    const onSearch = jest.fn();
    const { result } = renderHook(() =>
      useSearch({ initialValues, items, onSearch })
    );

    act(() => {
      result.current.handleSearch('File 2');
      jest.advanceTimersByTime(100);
    });

    // searchTerm should update to 'File 2'
    expect(result.current.searchTerm).toBe('File 2');
    // Only 'File 2' should match
    expect(result.current.filteredItems).toEqual([
      { name: 'File 2', type: 'image' },
    ]);
  });

  it('should debounce the onSearch callback', () => {
    const initialValues: InitialSearchValues<(typeof items)[0]> = {
      searchTerm: '',
      searchKey: 'name',
      debounceDelay: 50,
    };
    const onSearch = jest.fn();
    const { result } = renderHook(() =>
      useSearch({ initialValues, items, onSearch })
    );

    act(() => {
      result.current.handleSearch('File');
      result.current.handleSearch('File 1');
      jest.advanceTimersByTime(100);
    });

    expect(onSearch).toHaveBeenCalledTimes(1); // Debounced call should only trigger once
    expect(onSearch).toHaveBeenCalledWith('File 1', undefined);
  });

  it('should handle empty and non-matching search terms', () => {
    const initialValues: InitialSearchValues<(typeof items)[0]> = {
      searchTerm: '',
      searchKey: 'name',
      debounceDelay: 50,
    };
    const { result } = renderHook(() =>
      useSearch({ initialValues, items, onSearch: jest.fn() })
    );

    // No matches
    act(() => {
      result.current.handleSearch('Nonexistent');
      jest.advanceTimersByTime(100);
    });
    expect(result.current.filteredItems).toEqual([]);

    // Empty search term
    act(() => {
      result.current.handleSearch('');
      jest.advanceTimersByTime(100);
    });

    // All items should be returned
    expect(result.current.filteredItems).toEqual(items);
  });
});
