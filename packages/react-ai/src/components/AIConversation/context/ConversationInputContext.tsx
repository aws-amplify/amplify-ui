import React from 'react';

export interface ConversationInput {
  text?: string;
  files?: File[];
}

export interface ConversationInputContext {
  input?: ConversationInput;
  setInput?: React.Dispatch<
    React.SetStateAction<ConversationInput | undefined>
  >;
}

export const ConversationInputContext =
  React.createContext<ConversationInputContext>({});

export const ConversationInputContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [input, setInput] = React.useState<ConversationInput | undefined>();

  const providerValue = React.useMemo(
    () => ({ input, setInput }),
    [input, setInput]
  );

  return (
    <ConversationInputContext.Provider value={providerValue}>
      {children}
    </ConversationInputContext.Provider>
  );
};
