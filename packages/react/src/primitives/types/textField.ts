import * as React from 'react';

import { FlexContainerStyleProps } from './flex';
import { InputProps } from './input';
import { FieldProps } from './field';

export interface TextFieldOptions extends FieldProps, FlexContainerStyleProps {
  /**
   * @description
   * Component(s) to show after input
   */
  outerEndComponent?: React.ReactNode;

  /**
   * @description
   * Component(s) to show before input
   */
  outerStartComponent?: React.ReactNode;

  /**
   * @description
   * FieldGroupIconButton component to show inside of input at start
   */
  innerStartComponent?: React.ReactNode;

  /**
   * @description
   * FieldGroupIconButton component to show inside of input at end
   */
  innerEndComponent?: React.ReactNode;

  /**
   * @description
   * Input field type
   */
  type?: InputProps['type'];
}

export interface TextFieldProps extends TextFieldOptions, InputProps {}
