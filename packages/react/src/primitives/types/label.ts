import { ViewProps } from './view';

export interface LabelProps extends ViewProps {
  /**
   * @description
   * Whether label should be visually hidden
   */
  visuallyHidden?: boolean;

  /**
   * @description
   * Inner text of the label
   */
  children: React.ReactNode;
}
