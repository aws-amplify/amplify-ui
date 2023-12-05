import { Fragment } from 'react';
import { FilterChildren } from './FilterChildren';

type InlineFilterProps = {
  children: React.ReactNode;
  filters: string[];
};

export const InlineFilter = ({ filters, children }: InlineFilterProps) => {
  if (!filters || !Array.isArray(filters) || filters.length < 1) {
    return <></>;
  }

  const filteredChildren: Array<React.JSX.Element> = [];

  filters.forEach((filter) => {
    filteredChildren.push(<Fragment key={filter}>{children}</Fragment>);
  });

  return <FilterChildren>{filteredChildren}</FilterChildren>;
};
