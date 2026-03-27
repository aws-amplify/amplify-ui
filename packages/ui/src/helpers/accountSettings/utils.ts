import type { AmplifyContext } from 'aws-amplify';
import { updatePassword, deleteUser as deleteAuthUser } from 'aws-amplify/auth';

import { getLogger } from '../utils';

const logger = getLogger('Auth');

type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

export const changePassword = async (
  ctx: AmplifyContext,
  { currentPassword, newPassword }: ChangePasswordInput
): Promise<void> => {
  try {
    logger.debug('calling Auth.updatePassword');
    await updatePassword(ctx, {
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

export const deleteUser = async (ctx: AmplifyContext) => {
  try {
    logger.debug('calling Auth.deleteUser');
    await deleteAuthUser(ctx);
    logger.debug('Auth.deleteUser was successful');
    return Promise.resolve();
  } catch (e) {
    logger.debug('Auth.deleteUser failed with error', e);
    return Promise.reject(e);
  }
};
