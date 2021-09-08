import { BaseComponentProps } from './base';
import { BaseStyleProps } from './style';
import { InputProps } from './input';

export interface RadioProps
  extends BaseComponentProps,
    BaseStyleProps,
    Pick<InputProps, 'value' | 'isDisabled'> {}
