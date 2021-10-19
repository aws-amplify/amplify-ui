import { ViewProps } from './view';

export interface LabelProps extends ViewProps {
  /**
   * Whether label should be visually hidden
   */
  visuallyHidden?: boolean;

  /**
   * Inner text of the label
   */
  children: React.ReactNode;
}
