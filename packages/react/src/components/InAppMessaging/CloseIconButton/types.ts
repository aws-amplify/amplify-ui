import { LinkProps } from '../../../primitives';

export interface CloseIconButtonProps extends Omit<LinkProps, 'children'> {
  /**
   * @description
   * Configures the accessible label for the close iconButton
   */
  dismissButtonLabel?: string;

  /**
   * @description
   * Function called when close iconButton is clicked
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
