import React from 'react';

import { BreadcrumbNavigation } from '../components/BreadcrumbNavigation';

interface NavigationItem {
  isCurrent?: boolean;
  name?: string;
  onNavigate?: () => void;
}

export interface NavigationProps {
  items: NavigationItem[];
}

export const Navigation = ({
  items,
}: NavigationProps): React.JSX.Element | null => {
  if (!items.length) {
    return null;
  }

  return <BreadcrumbNavigation breadcrumbs={items} />;
};
