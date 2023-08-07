import * as React from 'react';

type BreadcrumbsContextType = {
  separator?: React.ReactNode;
  // We pass down isCurrent from
  // Breadcrumbs.Item to Breadcrumbs.Link
  // because we need that information on both elements
  isCurrent?: boolean;
};

export const BreadcrumbsContext = React.createContext<BreadcrumbsContextType>(
  {}
);

export const BreadcrumbsProvider = ({
  children,
  separator,
  isCurrent,
}: React.PropsWithChildren<BreadcrumbsContextType>): JSX.Element => {
  const value = React.useMemo(
    () => ({ separator, isCurrent }),
    [separator, isCurrent]
  );
  return (
    <BreadcrumbsContext.Provider value={value}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbsContext = (): BreadcrumbsContextType => {
  const context = React.useContext(BreadcrumbsContext);
  if (!context) {
    throw new Error(
      'useBreadcrumbsContext must be used within a BreadcrumbsProvider'
    );
  }
  return context;
};
