import { LinkProps } from '../../../primitives';

export interface CloseIconButtonProps extends Omit<LinkProps, 'children'> {
  /**
   * Function called when close iconButton is clicked
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
