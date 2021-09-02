import { BaseComponentProps } from './base';
import { FlexStyleProps } from './flex';
import { BaseStyleProps } from './style';

export interface FieldGroupOptions
  extends BaseComponentProps,
    BaseStyleProps,
    FlexStyleProps {
  children?: React.ReactNode;
  endComponents?: React.ReactNode;
  startComponents?: React.ReactNode;
}
