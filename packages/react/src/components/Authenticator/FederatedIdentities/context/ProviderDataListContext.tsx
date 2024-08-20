import { ProviderData } from '../controls/types';
import React from 'react';

const ProviderDataListContext = React.createContext<ProviderData[] | undefined>(
  undefined
);

export const ProviderDataListProvider = ({
  children,
  providerDataList,
}: {
  children?: React.ReactNode;
  providerDataList: ProviderData[];
}): JSX.Element => {
  return (
    <ProviderDataListContext.Provider value={providerDataList}>
      {children}
    </ProviderDataListContext.Provider>
  );
};

export const useProviderDataListContext = (): ProviderData[] => {
  const providerDataList = React.useContext(ProviderDataListContext);

  if (!providerDataList) {
    throw new Error('ProviderDataList context does not exist');
  }

  return providerDataList;
};
