import React from 'react';
import { isObject } from '@aws-amplify/ui';

import { ActionHandler, TaskData } from '../actions';
import { useGetActionInput } from '../providers/configuration/context';
import { useStore } from '../providers/store';
import { Task, useProcessTasks } from '../tasks';

import { DEFAULT_ACTION_CONCURRENCY } from './constants';
import {
  HandleTasksOptions,
  // InferHandlerInput,
  HandlerInput,
  HandleTaskInput,
  HandleTasksInput,
  // InferUseHandlerState,
  UseHandlerState,
} from './types';

export const isTasksOptions = <TTask extends Task, TItems>(
  value?: HandleTasksOptions<TTask, TItems>
): value is HandleTasksOptions<TTask, TItems> =>
  isObject(value) && !!value?.items;

export function useHandler<
  TData extends TaskData,
  TValue,
  TTask extends Task<TData, TValue>,
  // infered value of provided `items`
  TItems extends TData[] | undefined = undefined,
>(
  action: ActionHandler<TData, TValue>,
  options?: HandleTasksOptions<TTask, TItems>
): UseHandlerState<TTask, TItems> {
  const hasOptions = isTasksOptions(options);
  const { items, onTaskSuccess } = options ?? {};
  const getConfig = useGetActionInput();

  const {
    location: { current },
  } = useStore()[0];

  const [state, processTask] = useProcessTasks<
    TData,
    TValue,
    TTask,
    TItems,
    number
  >(action, {
    items,
    concurrency: DEFAULT_ACTION_CONCURRENCY,
    onTaskSuccess,
  });

  const { reset, isProcessing, tasks } = state;

  const handler = React.useCallback(
    (input: HandlerInput<TTask['data'], TItems>) => {
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
  ] as UseHandlerState<TTask, TItems>;
}
