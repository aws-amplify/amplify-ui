import { AmplifyUser } from '@aws-amplify/ui';
import React from 'react';
import { ErrorComponent, SubmitButtonComponent } from '../types';

export interface WarningProps {
  /** called when end user cancels account deletion */
  onCancel?: () => void;
  /** called when user acknowledges account deletion */
  onConfirm?: () => void;
  /** whether account deletion is in progress */
  isDisabled?: boolean;
}

export type WarningComponent<Props = {}> = React.ComponentType<
  Props & WarningProps
>;

export type DeleteUserState =
  | 'IDLE'
  | 'CONFIRMATION'
  | 'DELETING'
  | 'DONE'
  | 'ERROR';

export interface DeleteUserComponents {
  Warning?: WarningComponent;
  SubmitButton?: SubmitButtonComponent;
  Error?: ErrorComponent;
}

export interface DeleteUserProps {
  /** custom delete user service override */
  handleDelete?: (user: AmplifyUser) => Promise<void> | void;

  /** callback for successful user deletion */
  onSuccess?: () => void;

  /** callback for unsuccessful user deletion  */
  onError?: (error: Error) => void;
}
