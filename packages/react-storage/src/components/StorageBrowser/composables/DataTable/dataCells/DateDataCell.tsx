import React from 'react';

import { ViewElement } from '../../../context/elements';
import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../../../constants';

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
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__table-date-data-cell`}
    >
      {date?.toLocaleString()}
    </ViewElement>
  );
};
