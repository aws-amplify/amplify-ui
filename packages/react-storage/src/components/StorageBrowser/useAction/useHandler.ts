import React from 'react';
import { isObject } from '@aws-amplify/ui';

import { ActionHandler, TaskData } from '../actions';
import { useGetActionInput } from '../providers/configuration/context';
import { useStore } from '../providers/store';
import { useProcessTasks } from '../tasks';

import { DEFAULT_ACTION_CONCURRENCY } from './constants';
import {
  HandleTasksOptions,
  InferActionOptions,
  InferHandlerInput,
  InferUseHandlerState,
} from './types';

export const isTasksOptions = <TData extends TaskData, TResult>(
  value?: HandleTasksOptions<TData, TResult>
): value is HandleTasksOptions<TData, TResult> =>
  isObject(value) && !!value?.items;

export function useHandler<T extends ActionHandler>(
  action: T
): InferUseHandlerState<T>;
export function useHandler<
  T extends ActionHandler,
  TOptions extends InferActionOptions<T>,
>(action: T, options?: TOptions): InferUseHandlerState<T, TOptions>;
export function useHandler<
  T,
  TOptions extends InferActionOptions<T> | undefined = undefined,
>(
  action: T extends ActionHandler<infer I, infer R>
    ? ActionHandler<I, R>
    : never,
  options?: TOptions
): InferUseHandlerState<T, TOptions> {
  const hasOptions = isTasksOptions(options);
  const { items, onTaskSuccess } = options ?? {};
  const getConfig = useGetActionInput();

  const {
    location: { current },
  } = useStore()[0];

  const taskOptions = !items
    ? undefined
    : { concurrency: DEFAULT_ACTION_CONCURRENCY, onTaskSuccess };

  const [state, processTask] = useProcessTasks(action, items, taskOptions);

  const { reset, isProcessing, tasks } = state;

  const handler = React.useCallback(
    (input: InferHandlerInput<T, TOptions>) => {
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
  ] as InferUseHandlerState<T, TOptions>;
}
