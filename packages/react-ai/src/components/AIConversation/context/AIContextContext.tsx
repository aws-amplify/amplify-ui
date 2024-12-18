import React from 'react';

export const AIContextContext = React.createContext<(() => object) | undefined>(
  undefined
);

export const AIContextProvider = ({
  children,
  aiContext,
}: {
  children?: React.ReactNode;
  aiContext?: () => object;
}): React.JSX.Element => {
  return (
    <AIContextContext.Provider value={aiContext}>
      {children}
    </AIContextContext.Provider>
  );
};
