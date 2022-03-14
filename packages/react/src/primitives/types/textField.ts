import * as React from 'react';

import { FlexContainerStyleProps } from './flex';
import { InputProps } from './input';
import { FieldProps } from './field';
import { TextAreaProps } from './textArea';

export interface TextFieldOptions extends FieldProps, FlexContainerStyleProps {
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

  /**
   * Input field type (only applies when isMultiline = false)
   */
  type?: InputProps['type'];
}

export interface TextInputFieldProps extends TextFieldOptions, InputProps {}

export interface TextAreaFieldMultilineProps
  extends TextFieldOptions,
    TextAreaProps {}

export type TextFieldProps<Multiline extends boolean = false> =
  (Multiline extends true
    ? TextAreaFieldMultilineProps
    : TextInputFieldProps) & {
    /**
     * @deprecated
     * Multiline functionality has been moved to TextAreaField and will be removed in next major release.
     * Please use TextAreaField instead of TextField for multiline text fields.
     */
    isMultiline?: Multiline;
  };
