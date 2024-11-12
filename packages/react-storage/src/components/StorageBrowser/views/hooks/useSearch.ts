import React from 'react';

interface UseSearchResult {
  searchQuery: string;
  includeSubfolders: boolean;
  reset: () => void;
  onSearchQueryChange: (query: string) => void;
  onChangeIncludeSubfolders: (includeSubfolders: boolean) => void;
  onSearchSubmit: () => void;
  onSearchClear: () => void;
}

interface UseSearchProps {
  onSearch?: (query: string, includeSubfolders?: boolean) => void;
}

export function useSearch(props: UseSearchProps): UseSearchResult {
  const { onSearch } = props;
  const [searchQuery, setQuery] = React.useState('');
  const [includeSubfolders, setIncludeSubfolders] = React.useState(false);

  const reset = () => {
    setQuery('');
    setIncludeSubfolders(false);
  };

  return {
    searchQuery,
    includeSubfolders,
    onSearchQueryChange: (value) => {
      setQuery(value);
    },
    onChangeIncludeSubfolders: (value) => {
      setIncludeSubfolders(value);
    },
    onSearchSubmit: () => {
      onSearch?.(searchQuery, includeSubfolders);
    },
    onSearchClear: reset,
    reset,
  };
}
