import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import { Field } from '../components/Field';
import { CLASS_BASE } from '../views/constants';

const BLOCK_NAME = `${CLASS_BASE}__folder-name`;

export interface FolderNameProps {
  id?: string;
  isDisabled?: boolean;
  label?: string;
  placeholder?: string;
  onFolderNameChange?: (value: string) => void;
  onValidateFolderName?: (value: string) => void;
  validationMessage?: React.ReactNode;
}

export function FolderName({
  id,
  isDisabled,
  label,
  onFolderNameChange,
  onValidateFolderName,
  placeholder,
  validationMessage,
}: FolderNameProps): React.JSX.Element {
  const handleValidate = ({
    target: { value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.FocusEvent<HTMLInputElement>) => {
    if (isFunction(onValidateFolderName)) onValidateFolderName(value);
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
        if (validationMessage) handleValidate(event);

        if (isFunction(onFolderNameChange)) {
          onFolderNameChange(event.target.value);
        }
      }}
      placeholder={placeholder}
      type="text"
    >
      {validationMessage}
    </Field>
  );
}
