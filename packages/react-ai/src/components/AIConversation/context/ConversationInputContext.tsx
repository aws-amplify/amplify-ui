import React from 'react';

export interface ConversationInput {
  text?: string;
  files?: File[];
}

export interface ConversationInputContextProps {
  input?: ConversationInput;
  setInput?: React.Dispatch<
    React.SetStateAction<ConversationInput | undefined>
  >;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ConversationInputContext =
  React.createContext<ConversationInputContextProps>({});

export const ConversationInputContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element => {
  const [input, setInput] = React.useState<ConversationInput | undefined>();
  const [error, setError] = React.useState<string>();

  const providerValue = React.useMemo(
    () => ({ input, setInput, error, setError }),
    [input, setInput, error, setError]
  );

  return (
    <ConversationInputContext.Provider value={providerValue}>
      {children}
    </ConversationInputContext.Provider>
  );
};
