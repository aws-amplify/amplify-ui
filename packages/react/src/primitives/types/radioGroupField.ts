import * as React from 'react';

import { FlexContainerStyleProps } from './flex';
import { BaseFieldProps, LabelPositions } from './field';
import { BaseFieldsetProps } from './fieldset';
import { BaseInputProps } from './input';
import { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseRadioGroupFieldProps
  extends Omit<BaseFieldProps, 'label' | 'labelHidden'>,
    FlexContainerStyleProps,
    BaseFieldsetProps,
    Omit<BaseInputProps, 'variation'> {
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

export type RadioGroupFieldProps<Element extends ElementType = 'fieldset'> =
  PrimitiveProps<BaseRadioGroupFieldProps, Element>;
