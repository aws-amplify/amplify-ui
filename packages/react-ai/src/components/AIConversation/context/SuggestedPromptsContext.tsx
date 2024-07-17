import React from 'react';

interface SuggestedPrompt {
  icon?: React.ReactNode;
  header: string;
  inputText: string;
}

type SuggestedPromptsContextProps = SuggestedPrompt[] | undefined;

export const SuggestedPromptsContext =
  React.createContext<SuggestedPromptsContextProps>(undefined);

export const SuggestedPromptProvider = ({
  children,
  suggestedPrompts,
}: {
  children?: React.ReactNode;
  suggestedPrompts: SuggestedPrompt[];
}): JSX.Element => {
  return (
    <SuggestedPromptsContext.Provider value={suggestedPrompts}>
      {children}
    </SuggestedPromptsContext.Provider>
  );
};
