import { OverwriteToggleProps } from '../../composables/OverwriteToggle';
import { useControlsContext } from '../../controls/context';

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
