import { AddFilesProps } from '../../composables/AddFiles';
import { useControlsContext } from '../../controls/context';

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
