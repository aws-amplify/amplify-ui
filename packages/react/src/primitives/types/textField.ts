import * as React from 'react';

import { FlexContainerStyleProps } from './flex';
import { InputProps } from './input';
import { FieldProps } from './field';
import { TextAreaProps } from './textArea';

export type TextFieldType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url'
  | string;

export interface TextFieldOptions extends FieldProps, FlexContainerStyleProps {
  /**
   * Input field type
   */
  type?: TextFieldType;

  /**
   * Component(s) to show after input
   */
  outerEndComponent?: React.ReactNode;

  /**
   * Component(s) to show before input
   */
  outerStartComponent?: React.ReactNode;

  /**
   * FieldGroupIconButton component to show inside of input at start
   */
  innerStartComponent?: React.ReactNode;

  /**
   * FieldGroupIconButton component to show inside of input at end
   */
  innerEndComponent?: React.ReactNode;
}

export interface TextInputFieldProps extends TextFieldOptions, InputProps {
  isMultiline?: false;
}

export interface TextAreaFieldProps extends TextFieldOptions, TextAreaProps {
  isMultiline?: true;
}

export type TextFieldProps = TextAreaFieldProps | TextInputFieldProps;
