import React from 'react';
import { CustomAction } from '../types';

type ActionsContextProps = CustomAction[] | undefined;

export const ActionsContext =
  React.createContext<ActionsContextProps>(undefined);

export const ActionsProvider = ({
  children,
  actions,
}: {
  children?: React.ReactNode;
  actions: CustomAction[];
}): JSX.Element => {
  return (
    <ActionsContext.Provider value={actions}>
      {children}
    </ActionsContext.Provider>
  );
};
