import React from 'react';

import listLocationItemsAction from './listLocationItemsAction';
import { createActionStateContext } from './createActionStateContext';

export const DEFAULT_ACTIONS = { LIST_LOCATION_ITEMS: listLocationItemsAction };
export const INITIAL_VALUE = {
  LIST_LOCATION_ITEMS: { items: [], nextToken: undefined },
};

const CONTEXT_ERROR_MESSAGE = 'context scope error here';

export const [ActionStateProvider, useAction] = createActionStateContext(
  DEFAULT_ACTIONS,
  CONTEXT_ERROR_MESSAGE
);

export function ActionProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <ActionStateProvider initialValue={INITIAL_VALUE}>
      {children}
    </ActionStateProvider>
  );
}
