import type { AddFolderProps } from '../../components/composables/AddFolder';
import { useControlsContext } from '../context';

export const useAddFolder = (): AddFolderProps => {
  const {
    data: { addFolderLabel, isAddFolderDisabled },
    onAddFolder,
  } = useControlsContext();
  return {
    isDisabled: isAddFolderDisabled,
    label: addFolderLabel,
    onAddFolder,
  };
};
