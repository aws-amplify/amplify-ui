import React from 'react';

import { Field } from '../components/Field';
import { CLASS_BASE } from '../views/constants';

const BLOCK_NAME = `${CLASS_BASE}__folder-name-field`;

export interface FolderNameFieldProps {
  id?: string;
  isDisabled?: boolean;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onValidate?: (value: string) => void;
  validationMessage?: React.ReactNode;
}

export function FolderNameField({
  id,
  isDisabled,
  label,
  onChange,
  onValidate,
  placeholder,
  validationMessage,
}: FolderNameFieldProps): React.JSX.Element {
  const handleValidate = ({
    target: { value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.FocusEvent<HTMLInputElement>) => {
    onValidate?.(value);
  };

  return (
    <Field
      aria-describedby={id}
      aria-invalid={!!validationMessage}
      className={`${BLOCK_NAME}__field`}
      disabled={isDisabled}
      id={id}
      label={label}
      onBlur={handleValidate}
      onChange={(event) => {
        if (validationMessage) handleValidate?.(event);

        onChange?.(event.target.value);
      }}
      placeholder={placeholder}
      type="text"
    >
      {validationMessage}
    </Field>
  );
}
