import React from 'react';

import {
  InputElementProps,
  ViewElement,
  InputElement,
  LabelElement,
} from '../context/elements';
import { CLASS_BASE } from '../Views/constants';

const BLOCK_NAME = `${CLASS_BASE}__field`;

interface FieldProps extends InputElementProps {
  className?: string;
  icon?: React.ReactNode;
  label?: string;
}
export function Field({
  'aria-describedby': ariaDescribedBy = 'fieldError',
  className = BLOCK_NAME,
  children,
  label,
  icon = null,
  id,
  ...props
}: FieldProps): React.JSX.Element {
  return (
    <ViewElement className={className}>
      {icon}
      {label ? (
        <LabelElement className={`${className}__label`} htmlFor={id}>
          {label}
        </LabelElement>
      ) : null}
      <InputElement
        {...props}
        aria-describedby={ariaDescribedBy}
        className={`${className}__input`}
        id={id}
        type={'text'}
      />
      {children}
    </ViewElement>
  );
}
