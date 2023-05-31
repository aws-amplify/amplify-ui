import * as React from 'react';

import { FlexContainerStyleProps } from './flex';
import { BaseInputProps } from './input';
import { BaseFieldProps } from './field';
import { PrimitiveProps, ElementType } from './view';

export interface TextFieldOptions
  extends BaseFieldProps,
    FlexContainerStyleProps {
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
  type?: BaseInputProps['type'];
}

export interface BaseTextFieldProps extends TextFieldOptions, BaseInputProps {}

export type TextFieldProps<Element extends ElementType = 'input'> =
  PrimitiveProps<BaseTextFieldProps, Element>;
