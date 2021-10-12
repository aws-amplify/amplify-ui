import { FlexProps } from './flex';

export interface FieldGroupOptions extends FlexProps {
  children?: React.ReactNode;
  outerStartComponent?: React.ReactNode;
  outerEndComponent?: React.ReactNode;
  innerStartComponent?: React.ReactNode;
  innerEndComponent?: React.ReactNode;
}
