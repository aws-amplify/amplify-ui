import { InputProps } from './input';
import { LabelPositions } from './field';

export interface RadioProps extends InputProps {
  value: string;

  /**
   * Position of label in relation to the radio,
   * default is 'start'
   */
  labelPosition?: LabelPositions;
}
