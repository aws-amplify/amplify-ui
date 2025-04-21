import type { ActionsListProps } from '../../components/composables/ActionsList';
import { useControlsContext } from '../context';

export const useActionsList = (): ActionsListProps => {
  const {
    data: { actions, isActionsListDisabled },
    onActionSelect,
  } = useControlsContext();
  return {
    isDisabled: isActionsListDisabled,
    items: actions ?? [],
    onActionSelect,
  };
};
