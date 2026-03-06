import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../../../base';
import { ViewElement } from '../../../elements';

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
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__table-number-data-cell`}>
      {displayValue ?? value}
    </ViewElement>
  );
};
