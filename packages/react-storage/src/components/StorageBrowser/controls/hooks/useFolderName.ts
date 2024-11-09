import { FolderNameProps } from '../../composables/FolderName';
import { useControlsContext } from '../../controls/context';

export const useFolderName = (): FolderNameProps => {
  const { data, onValidateFolderName, onFolderNameChange } =
    useControlsContext();

  const {
    folderNameLabel: label,
    folderNameValidationMessage: validationMessage,
    folderNameId: id,
    folderNamePlaceholder: placeholder,
    isFolderNameDisabled: isDisabled,
  } = data;

  return {
    id,
    isDisabled,
    label,
    placeholder,
    onFolderNameChange,
    onValidateFolderName,
    validationMessage,
  };
};
