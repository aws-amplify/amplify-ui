import React from 'react';
import { Checkbox } from '@aws-amplify/ui-react';

export interface CheckboxDataCellProps {
  content: {
    checked?: boolean;
    label?: string;
    onSelect?: () => void;
    id?: string;
  };
}

export const CheckboxDataCell = ({
  content,
}: CheckboxDataCellProps): React.JSX.Element => {
  const { checked = false, label, onSelect, id } = content;
  return (
    <Checkbox
      name={label ?? ''}
      checked={checked}
      labelHidden
      label={label}
      onChange={onSelect}
      id={id}
    />
  );
};
