import React from 'react';
import { Checkbox } from '@aws-amplify/ui-react';

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
      name={label ?? ''}
      checked={checked}
      labelHidden
      label={label}
      onChange={onSelect}
      id={id}
    />
  );
};
