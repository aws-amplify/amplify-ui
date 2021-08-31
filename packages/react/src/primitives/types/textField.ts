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
  | 'url'
  | string;

export interface TextFieldProps extends InputProps, FieldProps, FlexStyleProps {
  /**
   * Input field type
   */
  type?: TextFieldType;

  /**
   * Component(s) to show after input
   */
  inputEndComponents?: React.ReactNode;

  /**
   * Component(s) to show before input
   */
  inputStartComponents?: React.ReactNode;
}
