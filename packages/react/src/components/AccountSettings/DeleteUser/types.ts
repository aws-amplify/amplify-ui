import React from 'react';

import { AmplifyUser } from '@aws-amplify/ui';

import { ButtonComponent, ErrorMessageComponent } from '../types';

export interface WarningViewProps {
  /** called when end user cancels account deletion */
  onCancel: () => void;
  /** called when user acknowledges account deletion */
  onConfirm: () => void;
  /** whether account deletion is in progress */
  isDisabled: boolean;
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
  handleDelete?: (user: AmplifyUser) => Promise<void> | void;

  /** callback for successful user deletion */
  onSuccess?: () => void;

  /** callback for unsuccessful user deletion  */
  onError?: (error: Error) => void;

  /** custom component overrides */
  components?: DeleteUserComponents;
}
