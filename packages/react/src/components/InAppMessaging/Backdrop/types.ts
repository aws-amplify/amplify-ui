import { ViewProps } from '../../../primitives/types';

export interface BackdropProps extends ViewProps {
  /**
   * Function called when backdrop is clicked
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
