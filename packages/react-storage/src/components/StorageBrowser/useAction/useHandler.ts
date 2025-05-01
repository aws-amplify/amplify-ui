import React from 'react';

import { useGetActionInput } from '../configuration';
import { DEFAULT_ACTION_CONCURRENCY } from './constants';
import type { ActionHandler } from '../actions';
import type { Task } from '../tasks';
import { useProcessTasks } from '../tasks';

import type {
  HandleTaskInput,
  HandleTasksInput,
  InferTask,
  HandleTaskState,
  HandleTasksState,
  UseHandlerOptions,
  UseHandlerOptionsWithItems,
} from './types';

const isOptionsWithItems = <T extends Task>(
  options?: UseHandlerOptions<T> | UseHandlerOptionsWithItems<T>
): options is UseHandlerOptionsWithItems<T> =>
  !!(options as UseHandlerOptionsWithItems<T>)?.items;

const isHandleTaskInput = <T>(
  value?: HandleTasksInput | HandleTaskInput<T>
): value is HandleTaskInput<T> => !!(value as HandleTaskInput<T>)?.data;

export function useHandler<
  THandler extends ActionHandler,
  TTask extends InferTask<THandler>,
>(
  handler: THandler,
  options: UseHandlerOptionsWithItems<TTask>
): HandleTasksState<TTask>;
export function useHandler<
  THandler extends ActionHandler,
  TTask extends InferTask<THandler>,
>(
  handler: THandler,
  options?: UseHandlerOptions<TTask>
): HandleTaskState<TTask>;
export function useHandler<
  THandler extends ActionHandler,
  TTask extends InferTask<THandler>,
>(
  handler: THandler,
  options?: UseHandlerOptionsWithItems<TTask> | UseHandlerOptions<TTask>
): HandleTasksState<TTask> | HandleTaskState<TTask> {
  const [state, handleProcessing] = useProcessTasks(handler, options);
  const getConfig = useGetActionInput();

  const { reset, isProcessing, tasks, ...rest } = state;

  const handleDispatch = React.useCallback(
    (input?: HandleTasksInput | HandleTaskInput<TTask['data']>): void => {
      const config = getConfig(input?.location);
      const hasData = isHandleTaskInput(input);

      // clean up previous state for atomic handler
      if (hasData) reset();

      handleProcessing({
        config,
        ...(hasData
          ? { data: input.data }
          : // if no `data` provided, provide `concurrency` to `options`
            { options: { concurrency: DEFAULT_ACTION_CONCURRENCY } }),
      });
    },
    [getConfig, handleProcessing, reset]
  );

  if (isOptionsWithItems(options)) {
    return [{ ...rest, isProcessing, reset, tasks }, handleDispatch];
  }

  return [{ isProcessing, task: tasks?.[0] }, handleDispatch];
}
