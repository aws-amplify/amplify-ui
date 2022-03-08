import * as React from 'react';

import { FlexContainerStyleProps } from './flex';
import { FieldProps, LabelPositions } from './field';
import { InputProps } from './input';

export interface RadioGroupFieldProps
  extends FieldProps,
    FlexContainerStyleProps,
    InputProps {
  name: string;
  value?: string;
  defaultValue?: string;
  /**
   * Handle onChange event
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Position of label in relation to the radio,
   * default is 'start'
   */
  labelPosition?: LabelPositions;
}
