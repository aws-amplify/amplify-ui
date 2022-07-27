import { ViewProps } from '../../../primitives/types';

export interface BackdropProps extends ViewProps {
  /**
   * Function called when backdroop is clicked
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
