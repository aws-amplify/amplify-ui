import { DropZoneProps } from '../../composables/DropZone';
import { useControlsContext } from '../../controls/context';

export type UseDropZone = () => {
  props?: {
    onDropComplete: DropZoneProps['onDropComplete'];
  };
};

/**
 * This hook, not to be confused with the useDropZone vended from @aws-amplify/ui-react-core, is only intended for use
 * with its corresponding DropZone control.
 */
export const useDropZone: UseDropZone = () => {
  const { onDropFiles } = useControlsContext();

  return {
    props: {
      onDropComplete: onDropFiles,
    },
  };
};
