import React from 'react';

import { DescriptionList } from '../components/DescriptionList';

interface Status {
  name: string;
  count: number;
}

export interface StatusDisplayProps {
  statuses: Status[];
  total: number;
}

export const StatusDisplay = ({
  statuses,
  total,
}: StatusDisplayProps): React.JSX.Element | null => {
  if (!statuses?.length) {
    return null;
  }

  const descriptions = statuses.map(({ name, count }) => ({
    term: name,
    details: `${count}/${total}`,
  }));

  return <DescriptionList descriptions={descriptions} />;
};
