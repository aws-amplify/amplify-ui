import React from 'react';

interface InputContext {
  input?: string;
  setInput?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const InputContext = React.createContext<InputContext>({});

export const InputContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [input, setInput] = React.useState<string | undefined>();

  const providerValue = React.useMemo(
    () => ({ input, setInput }),
    [input, setInput]
  );

  return (
    <InputContext.Provider value={providerValue}>
      {children}
    </InputContext.Provider>
  );
};
