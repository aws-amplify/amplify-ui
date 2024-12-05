import React from 'react';

import { ViewElement } from '../../../context/elements';
import { STORAGE_BROWSER_BLOCK } from '../../../constants';

export interface DateDataCellProps {
  content: {
    value?: Date;
    displayValue?: string;
  };
}

export const DateDataCell = ({
  content,
}: DateDataCellProps): React.JSX.Element => {
  const { value, displayValue } = content;
  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__table-date-data-cell`}>
      {displayValue ?? value?.toLocaleString()}
    </ViewElement>
  );
};
