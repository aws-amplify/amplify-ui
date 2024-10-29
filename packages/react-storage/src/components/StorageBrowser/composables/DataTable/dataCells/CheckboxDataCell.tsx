import React from 'react';
import { Checkbox } from '../../../components/Checkbox';
import { ViewElement } from '../../../context/elements';
import { CLASS_BASE } from '../../../views/constants';

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
    <ViewElement className={`${CLASS_BASE}__table-checkbox-data-cell`}>
      <Checkbox
        checked={checked}
        labelHidden
        labelText={label}
        onSelect={onSelect}
      />
    </ViewElement>
  );
};
