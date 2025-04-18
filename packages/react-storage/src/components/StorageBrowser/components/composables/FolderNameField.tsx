import React from 'react';

import { Field, STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../base';

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
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__folder-name-field`}
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
