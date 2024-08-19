import { ProviderData } from '../controls/types';
import React from 'react';

const ProviderDataContext = React.createContext<ProviderData | undefined>(
  undefined
);

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

export const useProviderDataContext = (): ProviderData => {
  const providerData = React.useContext(ProviderDataContext);

  if (providerData === undefined) {
    throw new Error('ProviderData does not exist');
  }
  return providerData;
};
