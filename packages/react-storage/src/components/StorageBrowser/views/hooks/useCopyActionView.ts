import { useMemo, useState } from 'react';

import { isFunction } from '@aws-amplify/ui';

import { useControl } from '../../context/control';
import { copyHandler } from '../../actions/handlers';
import { Task, useProcessTasks } from '../../tasks';
import { useGetLocationConfig } from '../../context/config';

interface UseActionView {
  destination: string;
  isProcessing: boolean;
  onCancel: () => void;
  onStart: () => void;
  // statuses: Status[];
  tasks: Task[];
  onClose: () => void;
}

interface UseCopyActionView extends UseActionView {
  path: string;
  tasks: Task<{
    destinationPrefix: string;
  }>[];
  destinationList: string[];
  onSetDestinationList: (destination: string[]) => void;
}

export const useCopyActionView = (): UseCopyActionView => {
  const [isProcessing, setIsProcessing] = useState(false);
  const getConfig = useGetLocationConfig();
  const { bucket, credentialsProvider, region } = getConfig();

  const [{ path, history }] = useControl('NAVIGATE');
  const [destinationList, onSetDestinationList] = useState([
    ...history.map((item) => item.prefix),
  ]);
  const destination = destinationList.join('');
  const [, handleUpdateState] = useControl('LOCATION_ACTIONS');
  const [
    {
      selected: { items: selected = [] },
    },
  ] = useControl('LOCATION_ACTIONS');

  const processTasksInputItems = useMemo(() => {
    return selected
      ? selected.map((item) => ({
          ...item,
          key: item.key,
          item: { destinationPrefix: destination },
          cancel: () => {},
        }))
      : [];
  }, [destination, selected]);

  const [tasks, processTasks] = useProcessTasks(
    copyHandler,
    processTasksInputItems
  );

  const onStart = () => {
    if (destinationList) {
      processTasks({
        prefix: path ?? '',
        config: {
          accountId: '',
          bucket,
          credentials: credentialsProvider,
          region,
        },
      });
    }
    setIsProcessing(true);
  };

  const onCancel = () => {
    tasks.forEach((task) => {
      // @TODO Fixme, cancel doesn't currently cancel the task
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onClose = () => {
    handleUpdateState({ type: 'CLEAR' });
  };
  return {
    path: path ?? '',
    tasks,
    isProcessing,
    destinationList,
    onCancel,
    onClose,
    onSetDestinationList,
    onStart,
    destination,
  };
};
