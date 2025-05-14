import type { OverwriteToggleProps } from '../../components/composables/OverwriteToggle';
import { useControlsContext } from '../context';

export const useOverwriteToggle = (): OverwriteToggleProps => {
  const {
    data: {
      isOverwritingEnabled,
      isOverwriteToggleDisabled,
      overwriteToggleLabel,
    },
    onToggleOverwrite,
  } = useControlsContext();
  return {
    isDisabled: isOverwriteToggleDisabled,
    isOverwritingEnabled,
    label: overwriteToggleLabel,
    onToggle: onToggleOverwrite,
  };
};
