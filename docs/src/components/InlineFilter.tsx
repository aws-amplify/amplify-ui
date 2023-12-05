import { Fragment } from 'react';
import { useRouter } from 'next/router';

type InlineFilterProps = {
  children: React.ReactNode;
  filters: string[];
};

export const InlineFilter = ({ filters, children }: InlineFilterProps) => {
  if (!filters || !Array.isArray(filters) || filters.length < 1) {
    return null;
  }
  const router = useRouter();

  let filterKey = '';

  if ('platform' in router.query) {
    filterKey = router.query.platform as string;
  }

  let filteredChildren: Array<React.JSX.Element> = [];

  filters.forEach((filter) => {
    if (filter === filterKey || filter === 'all') {
      filteredChildren.push(<Fragment key={filter}>{children}</Fragment>);
    }
  });

  return filteredChildren;
};
