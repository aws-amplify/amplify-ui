import React from 'react';
import { isObject } from '@aws-amplify/ui';

import {
  TaskData,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOutput,
} from '../actions';
import { useGetActionInput } from '../providers/configuration/context';
import { useStore } from '../providers/store';
import { useProcessTasks } from '../tasks';

import { DEFAULT_ACTION_CONCURRENCY } from './constants';
import { HandleTasksOptions, HandlerInput, UseHandlerState } from './types';

const isTasksOptions = <T extends TaskData>(
  value?: HandleTasksOptions<T>
): value is HandleTasksOptions<T> => isObject(value);

export const useHandler = <
  TData extends TaskData,
  RValue,
  TOptions extends HandleTasksOptions<TData>,
  // provides conditonal return of task/tasks states
  U extends TOptions | undefined = undefined,
>(
  action: TaskHandler<TaskHandlerInput<TData>, TaskHandlerOutput<RValue>>,
  options?: U
): UseHandlerState<TData, RValue, U> => {
  const hasOptions = isTasksOptions(options);
  const { items, onTaskSuccess } = options ?? {};
  const getConfig = useGetActionInput();

  const {
    location: { current },
  } = useStore()[0];

  const [state, processTask] = useProcessTasks(action, items, {
    onTaskSuccess,
    ...(items ? { concurrency: DEFAULT_ACTION_CONCURRENCY } : undefined),
  });

  const { reset, isProcessing, tasks } = state;

  const handler = React.useCallback(
    (input: HandlerInput<TData, RValue, U>) => {
      const { location } = input ?? {};
      const config = getConfig(location ?? current);

      if (!hasOptions) {
        // clean up previous state
        reset();
        processTask({ ...input, config });
        return;
      }

      processTask({ config });
    },
    [current, getConfig, hasOptions, processTask, reset]
  );

  return [
    hasOptions ? state : { isProcessing, task: tasks?.[0] },
    handler,
  ] as UseHandlerState<TData, RValue, U>;
};
