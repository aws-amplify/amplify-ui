import { SearchFieldProps } from '../../composables/SearchField';
import { useControlsContext } from '../../controls/context';

export const useSearchField = (): SearchFieldProps => {
  const { data, onSearch, onSearchClear, onSearchQueryChange } =
    useControlsContext();
  const {
    searchPlaceholder,
    searchClearLabel,
    searchQuery,
    searchSubmitLabel,
  } = data;

  return {
    clearLabel: searchClearLabel,
    placeholder: searchPlaceholder,
    query: searchQuery,
    submitLabel: searchSubmitLabel,
    onClear: onSearchClear,
    onQueryChange: onSearchQueryChange,
    onSearch,
  };
};
