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
  const _displayText = React.useContext(DisplayTextContext);

  if (!_displayText) {
    return displayText;
  }

  return _displayText;
};
