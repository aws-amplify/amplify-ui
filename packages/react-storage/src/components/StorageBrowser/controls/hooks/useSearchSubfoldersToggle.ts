import type { SearchSubfoldersToggleProps } from '../../components/composables/SearchSubfoldersToggle';
import { useControlsContext } from '../context';

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
