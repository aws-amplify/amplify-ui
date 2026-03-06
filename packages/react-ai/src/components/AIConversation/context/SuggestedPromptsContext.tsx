import React from 'react';
import type { SuggestedPrompt } from '../types';

type SuggestedPromptsContextProps = SuggestedPrompt[] | undefined;

export const SuggestedPromptsContext =
  React.createContext<SuggestedPromptsContextProps>(undefined);

export const SuggestedPromptProvider = ({
  children,
  suggestedPrompts,
}: {
  children?: React.ReactNode;
  suggestedPrompts?: SuggestedPrompt[];
}): React.JSX.Element => {
  return (
    <SuggestedPromptsContext.Provider value={suggestedPrompts}>
      {children}
    </SuggestedPromptsContext.Provider>
  );
};
