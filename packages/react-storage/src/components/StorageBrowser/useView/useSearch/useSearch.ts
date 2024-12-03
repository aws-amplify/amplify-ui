import React from 'react';

interface UseSearchResult {
  searchQuery: string;
  isSearchingSubfolders: boolean;
  onSearchQueryChange: (query: string) => void;
  onSearchSubmit: () => void;
  onToggleSearchSubfolders: () => void;
  resetSearch: () => void;
}

interface UseSearchProps {
  onSearch?: (query: string, includeSubfolders?: boolean) => void;
}

export function useSearch(props: UseSearchProps): UseSearchResult {
  const { onSearch } = props;
  const [searchQuery, setQuery] = React.useState('');
  const [isSearchingSubfolders, setIsSearchingSubfolders] =
    React.useState(false);

  const resetSearch = () => {
    setQuery('');
    setIsSearchingSubfolders(false);
  };

  return {
    searchQuery,
    isSearchingSubfolders,
    onSearchQueryChange: (value) => {
      setQuery(value);
    },
    onToggleSearchSubfolders: () => {
      setIsSearchingSubfolders((prev) => !prev);
    },
    onSearchSubmit: () => {
      onSearch?.(searchQuery, isSearchingSubfolders);
    },
    resetSearch,
  };
}
