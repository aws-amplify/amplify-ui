import { ProviderData } from '../controls/types';
import React from 'react';

const ProviderDataContext = React.createContext<ProviderData | undefined>(
  undefined
);

export const useProviderDataContext = (): ProviderData => {
  const providerData = React.useContext(ProviderDataContext);

  if (providerData === undefined) {
    throw new Error();
  }
  return providerData;
};

export const ProviderDataProvider = ({
  children,
  providerData,
}: {
  children?: React.ReactNode;
  providerData: ProviderData;
}): JSX.Element => {
  return (
    <ProviderDataContext.Provider value={providerData}>
      {children}
    </ProviderDataContext.Provider>
  );
};
