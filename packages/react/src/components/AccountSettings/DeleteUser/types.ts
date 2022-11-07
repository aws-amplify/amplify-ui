import { AmplifyUser } from '@aws-amplify/ui';

export interface DeleteUserConfirmationProps {
  // called when end user cancels account deletion
  onCancel: () => void;
  // called when user acknowledges account deletion
  onAcknowledge: () => void;
}

export interface DeleteUserProps {
  // custom delete user service override, if customer wants to add
  // their own logic before or after `Auth.deleteUser`.
  handleDelete?: (user: AmplifyUser) => Promise<void> | void;

  // callback for successful user deletion
  onSuccess?: () => void;

  // callback for unsuccessful user deletion
  onError?: () => void;

  // whether to skip delete user warning
  skipWarning?: boolean;
}
