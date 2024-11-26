import React from 'react';
import { ConversationInputContextProps } from './ConversationInputContext';
import { SuggestedPrompt } from '../types';
import { ConversationMessage } from '../../../types';
import { AttachmentContextProps } from './AttachmentContext';
import { ConversationDisplayText } from '../displayText';

export interface ControlsContextProps {
  Form?: React.ComponentType<
    {
      handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
      allowAttachments?: boolean;
      isLoading?: boolean;
      displayText: Required<ConversationDisplayText>;
    } & Required<ConversationInputContextProps> &
      Required<AttachmentContextProps>
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
