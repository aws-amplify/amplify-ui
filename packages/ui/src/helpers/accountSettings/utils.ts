import { Amplify, Auth } from 'aws-amplify';

import { AmplifyUser, PasswordSettings } from '../../types';
import { getLogger } from '../utils';

const logger = getLogger('Auth');

type ChangePasswordInput = {
  user: AmplifyUser;
  currentPassword: string;
  newPassword: string;
};

export const changePassword = async ({
  user,
  currentPassword,
  newPassword,
}: ChangePasswordInput): Promise<void> => {
  try {
    logger.debug('calling Auth.changePassword');
    /**
     * Auth.changePassword returns `Promise<"SUCCESS">`. We're not interested
     * in its resolved string value, so we just return Promise.resolve() on success.
     */
    await Auth.changePassword(user, currentPassword, newPassword);
    logger.debug('Auth.changePassword was successful');
    return Promise.resolve();
  } catch (e) {
    logger.debug('Auth.changePassword failed with error', e);
    return Promise.reject(e);
  }
};

export const getPasswordSettings = () => {
  // need to cast to any because `Amplify.configure()` isn't typed properly
  const config = Amplify.configure() as any;
  return config?.aws_cognito_password_protection_settings as PasswordSettings;
};

export const confirmPasswordValidator = (
  newPassword: string,
  confirmPassword: string
): string[] => {
  if (newPassword !== confirmPassword) {
    return ['Your passwords must match'];
  }
};
