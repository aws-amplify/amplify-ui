import React from 'react';

import { ViewElement } from '../../../context/elements';
import { CLASS_BASE } from '../../../views/constants';

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
    <ViewElement className={`${CLASS_BASE}__table-number-data-cell`}>
      {displayValue ?? value}
    </ViewElement>
  );
};
