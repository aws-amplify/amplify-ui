import { FlexProps } from './flex';
export type FieldGroupOrientation = 'horizontal' | 'vertical';

export interface FieldGroupOptions extends FlexProps {
  children?: React.ReactNode;
  orientation?: FieldGroupOrientation;
  outerStartComponent?: React.ReactNode;
  outerEndComponent?: React.ReactNode;
  innerStartComponent?: React.ReactNode;
  innerEndComponent?: React.ReactNode;
}
