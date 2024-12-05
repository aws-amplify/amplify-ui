import { ActionsListProps } from '../../composables/ActionsList';
import { useControlsContext } from '../../controls/context';

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
