import { useMemo, useState } from 'react';

import { isFunction } from '@aws-amplify/ui';

import { useControl } from '../../context/control';
import { deleteHandler } from '../../actions/handlers';
import { Task, useProcessTasks } from '../../tasks';
import { useGetLocationConfig } from '../../context/config';
import { UseActionView } from './types';

interface UseDeleteActionView extends UseActionView {
  path: string;
  tasks: Task[];
}

export const UseDeleteActionView = (): UseDeleteActionView => {
  const [isProcessing, setIsProcessing] = useState(false);
  const getConfig = useGetLocationConfig();
  const { bucket, credentialsProvider, region } = getConfig();

  const [{ path }] = useControl('NAVIGATE');
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
          item: {},
          cancel: () => {},
        }))
      : [];
  }, [selected]);

  const [tasks, processTasks] = useProcessTasks(
    deleteHandler,
    processTasksInputItems
  );

  const onStart = () => {
    processTasks({
      prefix: path ?? '',
      config: {
        accountId: '', // @TODO: pass in accountId here
        bucket,
        credentials: credentialsProvider,
        region,
      },
    });
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
    onCancel,
    onClose,
    onStart,
  };
};
