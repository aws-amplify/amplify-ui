import React from 'react';

interface InputContext {
  input?: string;
  setInput?: React.Dispatch<React.SetStateAction<string | undefined>>;
  fileInput?: File[];
  setFileInput?: React.Dispatch<React.SetStateAction<File[]>>;
}

export const InputContext = React.createContext<InputContext>({});

export const InputContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [input, setInput] = React.useState<string | undefined>();
  const [fileInput, setFileInput] = React.useState<File[]>([]);

  const providerValue = React.useMemo(
    () => ({ input, setInput, fileInput, setFileInput }),
    [input, setInput, fileInput, setFileInput]
  );

  return (
    <InputContext.Provider value={providerValue}>
      {children}
    </InputContext.Provider>
  );
};
