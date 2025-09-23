import type { ActionHandler } from '../actions';
import { useActionHandlers } from './context';
import { useHandler } from './useHandler';
import type { DefaultActionHandlers, UseAction } from './types';

type ListHandlerKeys = 'listLocations' | 'listLocationItems';

export const ERROR_MESSAGE =
  '`useAction` must be called from within `StorageBrowser.Provider`';

function assertActionHandlerKey(
  key: string
): asserts key is Exclude<keyof DefaultActionHandlers, ListHandlerKeys> {
  if (key === 'listLocations' || key === 'listLocationItems') {
    throw new Error(`Value of \`${key}\` cannot be provided to \`useAction\``);
  }
}

function assertActionHandler<I, R>(
  handler: unknown,
  key: string
): asserts handler is ActionHandler<I, R> {
  if (typeof handler !== 'function') {
    throw new Error(
      `No handler found for value of \`${key}\` provided to \`useAction\``
    );
  }
}

export const useAction: UseAction<DefaultActionHandlers> = ((key, options) => {
  assertActionHandlerKey(key);

  const { handlers } = useActionHandlers({ errorMessage: ERROR_MESSAGE });

  const handler = handlers?.[key];

  assertActionHandler(handler, key);

  return useHandler(handler, options);
  // casting to allow usage of `UseAction` interface which ensures that
  // the `options` param receives the correct typing
}) as UseAction<DefaultActionHandlers>;
