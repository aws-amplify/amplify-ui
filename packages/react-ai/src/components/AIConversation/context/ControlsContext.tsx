import React from 'react';
import { InputContext } from './InputContext';
import { SuggestedPrompt } from '../types';
import { ConversationMessage } from '../../../types';

export interface ControlsContextProps {
  Form?: React.ComponentType<
    {
      handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    } & Required<InputContext>
  >;
  MessageList?: React.ComponentType<{ messages: ConversationMessage[] }>;
  SuggestionList?: React.ComponentType<
    {
      suggestedPrompts: SuggestedPrompt[];
    } & Required<InputContext>
  >;
}

export const ControlsContext = React.createContext<
  ControlsContextProps | undefined
>(undefined);

export const ControlsProvider = ({
  children,
  controls,
}: {
  children?: React.ReactNode;
  controls?: ControlsContextProps;
}): JSX.Element => {
  return (
    <ControlsContext.Provider value={controls}>
      {children}
    </ControlsContext.Provider>
  );
};
