import React from 'react';
import { FlexProps } from './flex';
import { InputProps } from './input';

export interface CheckboxProps extends FlexProps, InputProps {
  /**
   * The label text
   */
  children: string;
  /**
   * The name of the input field in a checkbox (Useful for form submission).
   */
  name: string;

  /**
   * The value of the checkbox.
   */
  value: string;
}
