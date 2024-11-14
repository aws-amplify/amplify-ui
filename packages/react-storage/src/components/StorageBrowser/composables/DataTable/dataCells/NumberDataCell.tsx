import React from 'react';

import { ViewElement } from '../../../context/elements';
import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../../../constants';

export interface NumberDataCellProps {
  content: {
    value?: number;
    displayValue?: string;
  };
}

export const NumberDataCell = ({
  content,
}: NumberDataCellProps): React.JSX.Element => {
  const { displayValue, value } = content;
  return (
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__table-number-data-cell`}
    >
      {displayValue ?? value}
    </ViewElement>
  );
};
