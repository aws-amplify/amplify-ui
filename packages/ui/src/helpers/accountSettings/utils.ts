import { updatePassword } from 'aws-amplify/auth';

import { getLogger } from '../utils';

const logger = getLogger('Auth');

type ChangePasswordInput = {
  oldPassword: string;
  newPassword: string;
};

export const changePassword = async ({
  oldPassword,
  newPassword,
}: ChangePasswordInput): Promise<void> => {
  try {
    logger.debug('calling aws-amplify/auth updatePassword');
    /**
     * updatePassword returns `Promise<"SUCCESS">`. We're not interested
     * in its resolved string value, so we just return Promise.resolve() on success.
     */
    await updatePassword({ oldPassword, newPassword });
    logger.debug('aws-amplify/auth updatePassword was successful');
    return Promise.resolve();
  } catch (e) {
    logger.debug('aws-amplify/auth updatePassword failed with error', e);
    return Promise.reject(e);
  }
};

export const deleteUser = async () => {
  try {
    logger.debug('calling aws-amplify/auth deleteUser');
    //TODO: update when delete user API is available
    //await Auth.deleteUser();
    logger.debug('aws-amplify/auth deleteUser was successful');
    return Promise.resolve();
  } catch (e) {
    logger.debug('aws-amplify/auth deleteUser failed with error', e);
    return Promise.reject(e);
  }
};
