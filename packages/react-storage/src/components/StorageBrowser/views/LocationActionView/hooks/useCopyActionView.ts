import { useMemo, useState } from 'react';

import { isFunction } from '@aws-amplify/ui';

import { copyHandler } from '../../../actions/handlers';
import { Task, useProcessTasks } from '../../../tasks';
import { UseActionView } from './types';
import { useGetActionInput } from '../../../providers/configuration';
import { useStore } from '../../../providers/store';
import { getActionViewDisabledButtons } from '../utils';
import { getTaskCounts } from '../../../controls/getTaskCounts';
import { getDestinationListFullPrefix } from '../utils/getDestinationPickerDataTable';

interface UseCopyActionView extends UseActionView {
  tasks: Task<{
    destinationPrefix: string;
  }>[];
  destinationList: string[];
  onSetDestinationList: (destination: string[]) => void;
}

export const useCopyActionView = ({
  onClose: _onClose,
}: {
  onClose?: () => void;
}): UseCopyActionView => {
  const [
    {
      history,
      locationItems: { fileDataItems: selected },
    },
    dispatchStoreAction,
  ] = useStore();
  const { current } = history;

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
  const prefixWithoutSlashes = current
    ? current.prefix.split('/').slice(0, -1)
    : [];
  const [destinationList, onSetDestinationList] =
    useState(prefixWithoutSlashes);

  const taskCounts = getTaskCounts(tasks);
  const { disableCancel, disableClose, disablePrimary } =
    getActionViewDisabledButtons(taskCounts);

  const onStart = () => {
    if (!destinationList || !current?.prefix) return;
    handleProcess({
      config: getInput(),
      prefix: getDestinationListFullPrefix(destinationList),
    });
  };

  const onCancel = () => {
    tasks.forEach((task) => {
      // @TODO Fixme, calling cancel on task doesn't currently work
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onClose = () => {
    // clear files state
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(_onClose)) _onClose();
  };

  return {
    destinationList,
    disableCancel,
    disableClose,
    disablePrimary,
    onCancel,
    onClose,
    onSetDestinationList,
    onStart,
    taskCounts,
    tasks,
  };
};
