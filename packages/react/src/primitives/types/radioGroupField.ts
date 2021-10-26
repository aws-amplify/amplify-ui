import { FlexContainerStyleProps } from './flex';
import { FieldProps } from './field';
import { InputProps } from './input';
import React from 'react';

export interface RadioGroupFieldProps
  extends FieldProps,
    FlexContainerStyleProps,
    InputProps {
  name: string;
  value?: string;
  defaultValue?: string;
  /**
   * Handle onChange event
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
