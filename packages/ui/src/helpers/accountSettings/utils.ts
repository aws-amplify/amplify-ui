import { updatePassword, deleteUser as deleteAuthUser } from 'aws-amplify/auth';

import { getLogger } from '../utils';

const logger = getLogger('Auth');

type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
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

export const deleteUser = async (): Promise<void> => {
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
