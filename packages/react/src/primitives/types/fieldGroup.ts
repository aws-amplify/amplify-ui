import { BaseComponentProps } from './base';
import { FlexStyleProps } from './flex';
import { BaseStyleProps } from './style';

export interface FieldGroupOptions
  extends BaseComponentProps,
    BaseStyleProps,
    FlexStyleProps {
  children?: React.ReactNode;
  outerStartComponent?: React.ReactNode;
  outerEndComponent?: React.ReactNode;
  innerStartComponent?: React.ReactNode;
  innerEndComponent?: React.ReactNode;
}
