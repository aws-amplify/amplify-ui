import React from 'react';

interface UseSearchResult {
  searchQuery: string;
  includeSubfolders: boolean;
  onSearchQueryChange: (query: string) => void;
  onIncludeSubfoldersChange: (includeSubfolders: boolean) => void;
  onSearchSubmit: () => void;
  resetSearch: () => void;
}

interface UseSearchProps {
  onSearch?: (query: string, includeSubfolders?: boolean) => void;
}

export function useSearch(props: UseSearchProps): UseSearchResult {
  const { onSearch } = props;
  const [searchQuery, setQuery] = React.useState('');
  const [includeSubfolders, setIncludeSubfolders] = React.useState(false);

  const resetSearch = () => {
    setQuery('');
    setIncludeSubfolders(false);
  };

  return {
    searchQuery,
    includeSubfolders,
    onSearchQueryChange: (value) => {
      setQuery(value);
    },
    onIncludeSubfoldersChange: (value) => {
      setIncludeSubfolders(value);
    },
    onSearchSubmit: () => {
      onSearch?.(searchQuery, includeSubfolders);
    },
    resetSearch,
  };
}
