import { ActionHandler } from '../actions';
import { useActionHandlers } from './context';
import { DefaultActionHandlers, UseAction } from './types';
import { useHandler } from './useHandler';

export const ERROR_MESSAGE =
  '`useAction` must be called from within `StorageBrowser.Provider`';

// @ts-expect-error
export const useAction: UseAction<DefaultActionHandlers> = (key, options) => {
  // @ts-expect-error intentionally ignore TS here to avoid usage of the below
  // keys with `useAction`
  if (key === 'listLocations' || key === 'listLocationItems') {
    throw new Error(
      `Value of \`${key}\` cannot be used to index \`useAction\``
    );
  }

  const { handlers } = useActionHandlers({ errorMessage: ERROR_MESSAGE });

  const handler = handlers[key];

  if (!handler) {
    throw new Error(
      `No handler found for value of \`${key}\` provided to \`useAction\``
    );
  }

  return useHandler(handler as ActionHandler, options);
};
