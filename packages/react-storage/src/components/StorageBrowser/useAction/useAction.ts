import { ActionHandler } from '../actions';
import { useActionHandlers } from './context';
import { DefaultActionHandlers, UseAction } from './types';
import { useHandler } from './useHandler';

type ListHandlerKeys = 'listLocations' | 'listLocationItems';

export const ERROR_MESSAGE =
  '`useAction` must be called from within `StorageBrowser.Provider`';

export const useAction: UseAction<DefaultActionHandlers> = (key, options) => {
  if (
    (key as ListHandlerKeys) === 'listLocations' ||
    (key as ListHandlerKeys) === 'listLocationItems'
  ) {
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
