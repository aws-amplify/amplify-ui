import React from 'react';

import { ViewElement } from '../../../context/elements';
import { CLASS_BASE } from '../../../views/constants';

export interface DateDataCellProps {
  content: {
    date?: Date;
  };
}

export const DateDataCell = ({
  content,
}: DateDataCellProps): React.JSX.Element => {
  const { date } = content;
  return (
    <ViewElement className={`${CLASS_BASE}__table-date-data-cell`}>
      {date?.toLocaleString()}
    </ViewElement>
  );
};
