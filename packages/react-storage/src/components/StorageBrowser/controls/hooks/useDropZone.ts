import type { DropZoneProps } from '../../components/composables/DropZone';
import { useControlsContext } from '../context';

/**
 * This hook, not to be confused with the useDropZone vended from @aws-amplify/ui-react-core, is only intended for use
 * with its corresponding DropZone control.
 */
export const useDropZone = (): Pick<DropZoneProps, 'onDropFiles'> => {
  const { onDropFiles } = useControlsContext();

  return { onDropFiles };
};
