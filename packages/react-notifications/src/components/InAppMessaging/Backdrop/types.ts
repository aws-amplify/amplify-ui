import { ViewProps } from '@aws-amplify/ui-react';

export interface BackdropProps extends ViewProps {
  /**
   * Function called when backdrop is clicked
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
