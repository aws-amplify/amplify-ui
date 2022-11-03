import { AmplifyUser } from '../../types';
import { Auth } from 'aws-amplify';

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
    /**
     * Auth.changePassword returns `Promise<"SUCCESS">`. We're not interested
     * in its resolved string value, so we just return Promise.resolve() on success.
     */
    await Auth.changePassword(user, currentPassword, newPassword);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
