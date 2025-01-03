import React from 'react';
import { CustomAction } from '../types';

export const ActionsContext = React.createContext<CustomAction[] | undefined>(
  undefined
);

export const ActionsProvider = ({
  children,
  actions,
}: {
  children?: React.ReactNode;
  actions?: CustomAction[];
}): JSX.Element => {
  return (
    <ActionsContext.Provider value={actions}>
      {children}
    </ActionsContext.Provider>
  );
};
