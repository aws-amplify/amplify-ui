import { ViewProps } from './view';

export interface LabelProps extends ViewProps {
  /**
   * ID of DOM element the label should be associated with
   */
  htmlFor?: string;

  /**
   * Inner text of the label
   */
  children: React.ReactNode;

  /**
   * Whether label should be visually hidden
   */
  visuallyHidden?: boolean;
}
