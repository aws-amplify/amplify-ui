import { BaseInputProps } from './input';
import { LabelPositions } from './field';
import { ElementType, PrimitivePropsWithRef } from './view';

export interface BaseRadioProps extends BaseInputProps {
  value: string;

  /**
   * @description
   * Position of label in relation to the radio,
   * default is 'start'
   */
  labelPosition?: LabelPositions;
}

export type RadioProps<Element extends ElementType = 'input'> =
  PrimitivePropsWithRef<BaseRadioProps, Element>;
