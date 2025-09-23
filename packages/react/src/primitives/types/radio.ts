import type { BaseInputProps } from './input';
import type { LabelPositions } from './field';
import type { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseRadioProps extends BaseInputProps {
  value: string;

  /**
   * @description
   * Position of label in relation to the radio,
   * default is 'start'
   */
  labelPosition?: LabelPositions;
}

export type RadioProps<Element extends ElementType = 'input'> = PrimitiveProps<
  BaseRadioProps,
  Element
>;
