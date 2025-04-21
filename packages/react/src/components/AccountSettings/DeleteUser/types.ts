import type React from 'react';
import type { AuthUser } from 'aws-amplify/auth';

import type { ButtonComponent, ErrorMessageComponent } from '../types';
import type { DeleteUserDisplayText } from '../utils';

export interface WarningViewProps {
  /** called when end user cancels account deletion */
  onCancel: () => void;
  /** called when user acknowledges account deletion */
  onConfirm: () => void;
  /** whether account deletion is in progress */
  isDisabled: boolean;
  /** overrides default display text */
  displayText?: DeleteUserDisplayText;
}

export type WarningViewComponent<Props = {}> = React.ComponentType<
  Props & WarningViewProps
>;

export type DeleteUserState =
  | 'IDLE'
  | 'CONFIRMATION'
  | 'DELETING'
  | 'DONE'
  | 'ERROR';

export interface DeleteUserComponents {
  ErrorMessage?: ErrorMessageComponent;
  DeleteButton?: ButtonComponent;
  WarningView?: WarningViewComponent;
}

export interface DeleteUserProps {
  /** custom delete user service override */
  handleDelete?: (user: AuthUser) => Promise<void> | void;

  /** callback for successful user deletion */
  onSuccess?: () => void;

  /** callback for unsuccessful user deletion  */
  onError?: (error: Error) => void;

  /** custom component overrides */
  components?: DeleteUserComponents;

  /** overrides default display text*/
  displayText?: DeleteUserDisplayText;
}
