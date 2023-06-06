import * as React from 'react';

import { FlexContainerStyleProps } from './flex';
import { BaseFieldProps, LabelPositions } from './field';
import { BaseInputProps } from './input';
import { ElementType, PrimitiveProps } from './view';

export interface BaseRadioGroupFieldProps
  extends BaseFieldProps,
    FlexContainerStyleProps,
    BaseInputProps {
  name: string;
  value?: string;
  defaultValue?: string;
  /**
   * @description
   * Handle onChange event
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * @description
   * Position of label in relation to the radio,
   * default is 'start'
   */
  labelPosition?: LabelPositions;
}

export type RadioGroupFieldProps<Element extends ElementType = 'input'> =
  PrimitiveProps<BaseRadioGroupFieldProps, Element>;
