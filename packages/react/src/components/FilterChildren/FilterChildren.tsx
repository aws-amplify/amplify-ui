import React from 'react';

export interface FilterChildrenProps {
  children?: React.ReactNode;
  /**
   * string values to match against `targetFilter` against
   */
  allowedFilters?: string[];
  targetFilter?: string;
}

export const FilterChildren = ({
  allowedFilters,
  children = null,
  targetFilter,
}: FilterChildrenProps): JSX.Element | null => {
  const showContent =
    Array.isArray(allowedFilters) &&
    allowedFilters.some((filter) => filter === targetFilter);

  return showContent ? <>{children}</> : null;
};
