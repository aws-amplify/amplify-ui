import React from 'react';
import { ConversationInputContextProps } from './ConversationInputContext';
import { SuggestedPrompt } from '../types';
import { ConversationMessage } from '../../../types';

export interface ControlsContextProps {
  Form?: React.ComponentType<
    {
      handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
      allowAttachments?: boolean;
      isLoading?: boolean;
      onValidate: (files: File[]) => Promise<void>;
    } & ConversationInputContextProps
  >;
  MessageList?: React.ComponentType<{ messages: ConversationMessage[] }>;
  PromptList?: React.ComponentType<{
    suggestedPrompts?: SuggestedPrompt[];
    setInput: ConversationInputContextProps['setInput'];
  }>;
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
