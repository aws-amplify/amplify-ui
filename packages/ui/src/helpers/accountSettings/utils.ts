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
}: ChangePasswordInput) => {
  return Auth.changePassword(user, currentPassword, newPassword);
};
