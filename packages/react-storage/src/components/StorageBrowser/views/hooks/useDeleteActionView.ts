import { useMemo, useState } from 'react';

import { isFunction } from '@aws-amplify/ui';

import { useControl } from '../../context/control';
import { deleteHandler } from '../../actions/handlers';
import { Task, useProcessTasks } from '../../tasks';
import { useGetLocationConfig } from '../../context/config';
import { UseActionView } from './types';
import { ControlsContext } from '../../controls/types';
import { getTaskCounts } from '../../controls/getTaskCounts';

interface UseDeleteActionView extends UseActionView {
  path: string;
  tasks: Task[];
  controlsContextValue: ControlsContext;
  disableCancel: boolean;
  disablePrimary: boolean;
  disableClose: boolean;
}

const useActionViewTaskStatuses = (tasks: Task[]) => {
  const taskCounts = getTaskCounts(tasks);

  const hasStarted = taskCounts.QUEUED < taskCounts.TOTAL;
  const hasCompleted =
    !!taskCounts.TOTAL &&
    taskCounts.CANCELED + taskCounts.COMPLETE + taskCounts.FAILED ===
      taskCounts.TOTAL;

  const disableCancel = !hasStarted || taskCounts.QUEUED < 1;
  const disableClose = hasStarted && !hasCompleted;
  const disablePrimary = taskCounts.QUEUED < taskCounts.TOTAL;

  return {
    taskCounts,
    disableCancel,
    disableClose,
    disablePrimary,
  };
};

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

  const { disableCancel, disableClose, disablePrimary, taskCounts } =
    useActionViewTaskStatuses(tasks);

  const contextValue: ControlsContext = {
    data: { taskCounts },
    actionsConfig: { type: 'BATCH_ACTION', isCancelable: true },
  };

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
    controlsContextValue: contextValue,
    disableCancel,
    disableClose,
    disablePrimary,
    path: path ?? '',
    tasks,
    isProcessing,
    onCancel,
    onClose,
    onStart,
  };
};
