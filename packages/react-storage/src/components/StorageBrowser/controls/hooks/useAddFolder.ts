import { AddFolderProps } from '../../composables/AddFolder';
import { useControlsContext } from '../../controls/context';

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
