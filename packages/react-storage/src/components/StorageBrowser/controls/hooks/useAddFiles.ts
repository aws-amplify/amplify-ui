import type { AddFilesProps } from '../../components/composables/AddFiles';
import { useControlsContext } from '../context';

export const useAddFiles = (): AddFilesProps => {
  const {
    data: { addFilesLabel, isAddFilesDisabled },
    onAddFiles,
  } = useControlsContext();
  return {
    isDisabled: isAddFilesDisabled,
    label: addFilesLabel,
    onAddFiles,
  };
};
