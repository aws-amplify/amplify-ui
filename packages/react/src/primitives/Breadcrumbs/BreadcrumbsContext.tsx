import * as React from 'react';

interface BreadcrumbsContextInterface {
  separator?: React.ReactNode;
  // We pass down isCurrent from
  // Breadcrumbs.Item to Breadcrumbs.Link
  // because we need that information on both elements
  isCurrent?: boolean;
}

export const BreadcrumbsContext =
  React.createContext<BreadcrumbsContextInterface>({});
