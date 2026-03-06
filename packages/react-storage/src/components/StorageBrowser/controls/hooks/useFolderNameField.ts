import type { FolderNameFieldProps } from '../../components/composables/FolderNameField';
import { useControlsContext } from '../context';

export const useFolderNameField = (): FolderNameFieldProps => {
  const { data, onValidateFolderName, onFolderNameChange } =
    useControlsContext();

  const {
    folderNameId,
    folderNameLabel,
    folderNamePlaceholder,
    folderNameValidationMessage,
    isFolderNameDisabled,
  } = data;

  return {
    id: folderNameId,
    isDisabled: isFolderNameDisabled,
    label: folderNameLabel,
    onChange: onFolderNameChange,
    onValidate: onValidateFolderName,
    placeholder: folderNamePlaceholder,
    validationMessage: folderNameValidationMessage,
  };
};
