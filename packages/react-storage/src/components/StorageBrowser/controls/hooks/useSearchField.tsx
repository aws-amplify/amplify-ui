import type { SearchFieldProps } from '../../components/composables/SearchField';
import { useControlsContext } from '../context';

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
