import React from 'react';

import { DescriptionList, STORAGE_BROWSER_BLOCK } from '../base';

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

  return (
    <DescriptionList
      className={`${STORAGE_BROWSER_BLOCK}__status-display`}
      descriptions={descriptions}
    />
  );
};
