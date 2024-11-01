import { useMemo, useState } from 'react';

import { isFunction } from '@aws-amplify/ui';

import { copyHandler } from '../../../actions/handlers';
import { useProcessTasks } from '../../../tasks';
import { useGetActionInput } from '../../../providers/configuration';
import { useStore } from '../../../providers/store';
import { getActionViewDisabledButtons } from '../utils';
import { getTaskCounts } from '../../../controls/getTaskCounts';
import { getDestinationListFullPrefix } from '../utils/getDestinationPickerDataTable';
import { CopyViewState } from './types';

export const useCopyView = ({
  onExit: _onExit,
}: {
  onExit?: () => void;
}): CopyViewState => {
  const [
    {
      location,
      locationItems: { fileDataItems: selected },
    },
    dispatchStoreAction,
  ] = useStore();
  const { current } = location;

  const getInput = useGetActionInput();

  const processTasksInputItems = useMemo(() => {
    return selected
      ? selected.map((item) => ({
          ...item,
          key: item.key,
          item: { destinationPrefix: '' },
          cancel: () => {},
        }))
      : [];
  }, [selected]);

  const [tasks, handleProcess] = useProcessTasks(
    copyHandler,
    processTasksInputItems,
    {
      concurrency: 1,
    }
  );

  // need to handle non-supported non slack ending prefixes
  // in handler
  const prefixListWithoutSlashes = current?.prefix.includes('/')
    ? current.prefix.split('/').slice(0, -1)
    : [];
  const [destinationList, onSetDestinationList] = useState(
    prefixListWithoutSlashes
  );

  const taskCounts = getTaskCounts(tasks);
  const { disableCancel, disableClose, disablePrimary } =
    getActionViewDisabledButtons(taskCounts);

  const onActionStart = () => {
    if (!destinationList) return;
    handleProcess({
      config: getInput(),
      prefix: getDestinationListFullPrefix(destinationList),
    });
  };

  const onActionCancel = () => {
    tasks.forEach((task) => {
      // @TODO Fixme, calling cancel on task doesn't currently work
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onExit = () => {
    // clear files state
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(_onExit)) _onExit();
  };

  return {
    destinationList,
    disableCancel,
    disableClose,
    disablePrimary,
    onActionCancel,
    onExit,
    onSetDestinationList,
    onActionStart,
    taskCounts,
    tasks,
  };
};
