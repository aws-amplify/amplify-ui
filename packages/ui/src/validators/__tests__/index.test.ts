import { runValidators } from '..';
import { AuthFormData, PasswordSettings } from '../../types';

const formData: AuthFormData = {
  username: 'testuser',
  password: 'testpassword',
};
const touchData: AuthFormData = {};
const passwordSettings: PasswordSettings = {
  passwordPolicyMinLength: 8,
  passwordPolicyCharacters: ['REQUIRES_LOWERCASE', 'REQUIRES_NUMBERS'],
};

describe('runValidators', () => {
  it('should return a resolved promise if there are no errors', async () => {
    const validators = [
      jest.fn().mockResolvedValue({}),
      jest.fn().mockResolvedValue({}),
    ];

    await expect(
      runValidators(formData, touchData, passwordSettings, validators)
    ).resolves.toBeUndefined();

    expect(validators[0]).toHaveBeenCalledWith(
      formData,
      touchData,
      passwordSettings
    );
    expect(validators[1]).toHaveBeenCalledWith(
      formData,
      touchData,
      passwordSettings
    );
  });

  it('should return a rejected promise with merged errors if there are errors', async () => {
    const error1 = { username: 'Username is required' };
    const error2 = {
      password: 'Password must contain at least one lowercase letter',
    };
    const validators = [
      jest.fn().mockResolvedValue(error1),
      jest.fn().mockResolvedValue(error2),
    ];

    await expect(
      runValidators(formData, touchData, passwordSettings, validators)
    ).rejects.toEqual({ ...error1, ...error2 });

    expect(validators[0]).toHaveBeenCalledWith(
      formData,
      touchData,
      passwordSettings
    );
    expect(validators[1]).toHaveBeenCalledWith(
      formData,
      touchData,
      passwordSettings
    );
  });
});
