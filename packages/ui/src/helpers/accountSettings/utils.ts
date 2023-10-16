import { updatePassword, deleteUser as deleteAuthUser } from 'aws-amplify/auth';
import {
  Category,
  AuthAction,
  SetCustomUserAgentInput,
} from '@aws-amplify/core/internals/utils';
import { getLogger } from '../utils';

const logger = getLogger('Auth');

type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

export const changePasswordDataPlaneState: SetCustomUserAgentInput = {
  category: Category.Auth,
  apis: [AuthAction.UpdatePassword],
  additionalDetails: [['component', 'changepassword']],
};

export const deleteUserDataPlaneState: SetCustomUserAgentInput = {
  category: Category.Auth,
  apis: [AuthAction.DeleteUser],
  additionalDetails: [['component', 'deleteuser']],
};

export const changePassword = async ({
  currentPassword,
  newPassword,
}: ChangePasswordInput): Promise<void> => {
  try {
    logger.debug('calling Auth.updatePassword');
    await updatePassword({
      oldPassword: currentPassword,
      newPassword,
    });
    logger.debug('Auth.updatePassword was successful');
    return Promise.resolve();
  } catch (e) {
    logger.debug('Auth.updatePassword failed with error', e);
    return Promise.reject(e);
  }
};

export const deleteUser = async () => {
  try {
    logger.debug('calling Auth.deleteUser');
    await deleteAuthUser();
    logger.debug('Auth.deleteUser was successful');
    return Promise.resolve();
  } catch (e) {
    logger.debug('Auth.deleteUser failed with error', e);
    return Promise.reject(e);
  }
};
