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
