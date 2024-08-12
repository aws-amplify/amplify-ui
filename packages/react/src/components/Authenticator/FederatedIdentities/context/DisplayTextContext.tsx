import React from 'react';

export function displayText(displayName: string): string {
  return `Sign in with ${displayName}`;
}

const DisplayTextContext = React.createContext<typeof displayText | undefined>(
  undefined
);

export const DisplayTextProvider = ({
  children,
  customDisplayText,
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
  const context = React.useContext(DisplayTextContext);

  if (!context) {
    return displayText;
  }

  const _displayText = context;

  return _displayText;
};
