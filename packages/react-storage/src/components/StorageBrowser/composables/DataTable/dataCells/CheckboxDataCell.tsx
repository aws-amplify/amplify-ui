import React from 'react';
import { Checkbox } from '../../../components/Checkbox';
import { ViewElement } from '../../../context/elements';
import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../../../constants';

export interface CheckboxDataCellProps {
  content: {
    checked?: boolean;
    label?: string;
    onSelect?: () => void;
  };
}

export const CheckboxDataCell = ({
  content,
}: CheckboxDataCellProps): React.JSX.Element => {
  const { checked = false, label, onSelect } = content;
  return (
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__table-checkbox-data-cell`}
    >
      <Checkbox
        checked={checked}
        labelHidden
        labelText={label}
        onSelect={onSelect}
      />
    </ViewElement>
  );
};
