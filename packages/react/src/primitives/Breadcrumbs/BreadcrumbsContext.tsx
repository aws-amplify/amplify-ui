import * as React from 'react';

interface BreadcrumbsContextInterface {
  separator: React.ReactNode;
}

export const BreadcrumbsContext =
  React.createContext<BreadcrumbsContextInterface>({
    separator: () => null,
  });
