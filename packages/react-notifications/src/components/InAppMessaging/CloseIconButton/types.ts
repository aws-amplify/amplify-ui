import { ButtonProps } from '@aws-amplify/ui-react';

export interface CloseIconButtonProps extends ButtonProps {
  /**
   * @description
   * Configures the accessible label for the close iconButton
   */
  dismissButtonLabel?: string;
}
