import { BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

export interface RadioProps extends BaseComponentProps, BaseStyleProps {
  value: string;
  isDisabled?: boolean;
}
