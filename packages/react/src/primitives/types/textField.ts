import * as React from 'react';

import { FlexContainerStyleProps } from './flex';
import { InputProps } from './input';
import { FieldProps } from './field';

export type TextFieldType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url'
  | string;

export interface TextFieldProps
  extends InputProps,
    FieldProps,
    FlexContainerStyleProps {
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
