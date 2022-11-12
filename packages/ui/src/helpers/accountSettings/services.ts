import { AmplifyUser } from '../../types';
import { Auth } from 'aws-amplify';

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

export const deleteUser = async () => {
  try {
    logger.debug('calling Auth.deleteUser');
    await Auth.deleteUser();
    logger.debug('Auth.deleteUser was successful');
    return Promise.resolve();
  } catch (e) {
    logger.debug('Auth.deleteUser failed with error', e);
    return Promise.reject(e);
  }
};

export const getCurrentMFA = async (user: AmplifyUser) => {
  try {
    logger.debug('calling Auth.getPreferredMFA');

    const preferredMFA = Auth.getPreferredMFA(user);
    logger.debug('Auth.getPreferredMFA was successful');

    return preferredMFA;
  } catch (e) {
    logger.error('Auth.getPreferredMFA failed with error', e);
    return Promise.reject(e);
  }
};

export const setPreferredMFA = async ({
  user,
  mfaType,
}: {
  user: AmplifyUser;
  mfaType: 'TOTP' | 'SMS' | 'NOMFA';
}) => {
  try {
    logger.debug('calling Auth.setPreferredMFA');

    const preferredMFA = await Auth.setPreferredMFA(user, mfaType);
    logger.debug('Auth.setPreferredMFA was successful');

    return preferredMFA;
  } catch (e) {
    logger.error('Auth.setPreferredMFA failed with error', e);
    return Promise.reject(e);
  }
};

export const setupTOTP = async (user: AmplifyUser) => {
  try {
    logger.debug('calling Auth.setupTOTP');

    const secretCode = Auth.setupTOTP(user);
    logger.debug('Auth.setupTOTP was successful');

    return secretCode;
  } catch (e) {
    logger.error('Auth.setupTOTP failed with error', e);
    return Promise.reject(e);
  }
};

export const verifyTOTPToken = async ({
  user,
  code,
}: {
  user: AmplifyUser;
  code: string;
}) => {
  try {
    logger.debug('calling Auth.verifyTotpToken');
    await Auth.verifyTotpToken(user, code);
    logger.debug('Auth.verifyTotpToken was successful');
    return Promise.resolve();
  } catch (e) {
    logger.error('Auth.verifyTotpToken failed with error', e);
    return Promise.reject(e);
  }
};
