import { Auth } from 'aws-amplify';

import { changePassword, deleteUser } from '../utils';
import { AmplifyUser } from '../../../types';

// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');

const changePasswordSpy = jest.spyOn(Auth, 'changePassword');
const deleteUserSpy = jest.spyOn(Auth, 'deleteUser');

describe('changePassword', () => {
  const user = { username: 'testuser' } as AmplifyUser;
  const currentPassword = 'oldpassword';
  const newPassword = 'newpassword';

  it('should resolve if Auth.changePassword is successful', async () => {
    changePasswordSpy.mockResolvedValue('SUCCESS');

    await expect(
      changePassword({ user, currentPassword, newPassword })
    ).resolves.toBeUndefined();

    expect(changePasswordSpy).toHaveBeenCalledWith(
      user,
      currentPassword,
      newPassword
    );
  });

  it('should reject with error if Auth.changePassword fails', async () => {
    const error = new Error('change password failed');
    changePasswordSpy.mockRejectedValue(error);

    await expect(
      changePassword({ user, currentPassword, newPassword })
    ).rejects.toEqual(error);

    expect(changePasswordSpy).toHaveBeenCalledWith(
      user,
      currentPassword,
      newPassword
    );
  });
});

describe('deleteUser', () => {
  it('should resolve if Auth.deleteUser is successful', async () => {
    deleteUserSpy.mockResolvedValue(undefined);

    await expect(deleteUser()).resolves.toBeUndefined();

    expect(deleteUserSpy).toHaveBeenCalled();
  });

  it('should reject with error if Auth.deleteUser fails', async () => {
    const error = new Error('delete user failed');
    deleteUserSpy.mockRejectedValue(error);

    await expect(deleteUser()).rejects.toEqual(error);

    expect(deleteUserSpy).toHaveBeenCalled();
  });
});
