import React from 'react';

export function displayText(displayName: string): string {
  return `Sign In with ${displayName}`;
}

const DisplayTextContext = React.createContext<typeof displayText>(displayText);

export const DisplayTextProvider = ({
  children,
  customDisplayText = displayText,
}: {
  children?: React.ReactNode;
  customDisplayText?: typeof displayText;
}): JSX.Element => {
  return (
    <DisplayTextContext.Provider value={customDisplayText}>
      {children}
    </DisplayTextContext.Provider>
  );
};

export const useDisplayTextContext = (): typeof displayText => {
  return React.useContext(DisplayTextContext);
};
