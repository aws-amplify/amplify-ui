import React from 'react';

export interface Input {
  text?: string;
  files?: File[];
}

export interface InputContext {
  input?: Input;
  setInput?: React.Dispatch<React.SetStateAction<Input | undefined>>;
}

export const InputContext = React.createContext<InputContext>({});

export const InputContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [input, setInput] = React.useState<Input | undefined>();

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
