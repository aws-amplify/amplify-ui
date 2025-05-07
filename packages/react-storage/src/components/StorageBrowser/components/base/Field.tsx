import React from 'react';

import type { InputElementProps } from '../elements';
import { ViewElement, InputElement, LabelElement } from '../elements';
import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from './constants';

interface FieldProps extends InputElementProps {
  className?: string;
  icon?: React.ReactNode;
  label?: string;
}
export function Field({
  'aria-describedby': ariaDescribedBy = 'fieldError',
  className = `${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__field`,
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
        className={`${className}-input`}
        id={id}
        type={'text'}
      />
      {children}
    </ViewElement>
  );
}
