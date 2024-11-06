import { useState } from 'react';

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
      locationItems: { fileDataItems },
    },
    dispatchStoreAction,
  ] = useStore();
  const { key, current } = location;

  const getInput = useGetActionInput();

  const [{ tasks }, handleProcess] = useProcessTasks(
    copyHandler,
    fileDataItems,
    { concurrency: 4 }
  );

  const destinationListWithoutSlashes =
    // handle root bucket access grant
    key === ''
      ? ['']
      : // handle subfolder inside root access grant
      key && current?.prefix == ''
      ? ['', ...key.split('/').slice(0, -1)]
      : // regular access that starts at prefix (not root bucket)
      key.includes('/')
      ? key.split('/').slice(0, -1)
      : [];

  const [destinationList, onSetDestinationList] = useState(
    destinationListWithoutSlashes
  );

  const taskCounts = getTaskCounts(tasks);
  const { disableCancel, disableClose, disableStart } =
    getActionViewDisabledButtons(taskCounts);

  const onActionStart = () => {
    if (!destinationList) return;
    handleProcess({
      config: getInput(),
      destinationPrefix: getDestinationListFullPrefix(destinationList),
    });
  };

  const onActionCancel = () => {
    tasks.forEach((task) => {
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
    disableStart,
    onActionCancel,
    onExit,
    onSetDestinationList,
    onActionStart,
    taskCounts,
    tasks,
  };
};
