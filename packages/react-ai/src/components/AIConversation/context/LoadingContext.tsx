import React from 'react';

export const LoadingContext = React.createContext<boolean | undefined>(
  undefined
);

export const LoadingContextProvider = ({
  children,
  isLoading,
}: {
  children?: React.ReactNode;
  isLoading?: boolean;
}): JSX.Element => {
  return (
    <LoadingContext.Provider value={isLoading}>
      {children}
    </LoadingContext.Provider>
  );
};
