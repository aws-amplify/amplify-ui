import React from 'react';
import { Checkbox } from '../../../components/Checkbox';

export type CheckboxHeaderProps = {
  content: {
    checked?: boolean;
    label?: string;
    onSelect?: () => void;
    id?: string;
  };
};

export const CheckboxHeader = ({
  content,
}: CheckboxHeaderProps): React.JSX.Element => {
  const { checked = false, label, onSelect, id } = content;
  return (
    <Checkbox
      checked={checked}
      labelHidden
      labelText={label}
      onSelect={onSelect}
      id={id}
    />
  );
};
