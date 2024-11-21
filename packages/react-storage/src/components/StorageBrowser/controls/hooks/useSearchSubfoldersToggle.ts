import { SearchSubfoldersToggleProps } from '../../composables/SearchSubfoldersToggle';
import { useControlsContext } from '../../controls/context';

export const useSearchSubfoldersToggle = (): SearchSubfoldersToggleProps => {
  const {
    data: { isSearchingSubfolders, searchSubfoldersToggleLabel },
    onToggleSearchSubfolders,
  } = useControlsContext();
  return {
    isSearchingSubfolders,
    label: searchSubfoldersToggleLabel,
    onToggle: onToggleSearchSubfolders,
  };
};
