import { FlexStyleProps } from './flex';
import { InputProps } from './input';
import { FieldProps } from './field';
import React from 'react';

export type TextFieldType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url';

export interface TextFieldProps extends InputProps, FieldProps, FlexStyleProps {
  /**
   * Input field type
   */
  type?: TextFieldType;

  inputEndComponent?: React.ReactNode;
}
