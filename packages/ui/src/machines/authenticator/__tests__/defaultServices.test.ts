import { Amplify } from 'aws-amplify';

import { PasswordSettings } from '../../../types';
import { defaultServices } from '../defaultServices';
import { ALLOWED_SPECIAL_CHARACTERS } from '../../../helpers/authenticator/constants';

jest.mock('aws-amplify');

const {
  getAmplifyConfig,
  validateFormPassword,
  validateConfirmPassword,
  validateCustomSignUp,
  validatePreferredUsername,
} = defaultServices;

const untouched = { password: false };
const touched = { password: true };

const strictPasswordPolicy: PasswordSettings = {
  requireLowercase: true,
  requireNumbers: true,
  requireUppercase: true,
  requireSpecialCharacters: true,
  minLength: 8,
};

const lenientPasswordPolicy: PasswordSettings = {
  minLength: 4,
};

describe('validateFormPassword', () => {
  it('validates as expected with valid password and strict password policy', async () => {
    const password = 'UnitTest_Password1';
    const result = await validateFormPassword(
      { password },
      touched,
      strictPasswordPolicy
    );
    expect(result).toBeNull();
  });

  it('validates as expected with invalid password policy characters', async () => {
    const password = 'UnitTest_Password1';
    const passwordSettings: PasswordSettings = {
      //@ts-expect-error
      passwordPolicyCharacters: ['UNSUPPORTED'],
      minLength: 8,
    };
    const result = await validateFormPassword(
      { password },
      touched,
      passwordSettings
    );
    expect(result).toBeNull();
  });

  it('validates as expected with invalid password (has unknown special character) and strict password policy', async () => {
    // has special character not recognized by Cognito
    const password = 'UnitTestㄱPassword1';
    const result = await validateFormPassword(
      { password: password },
      touched,
      strictPasswordPolicy
    );
    expect(result).toStrictEqual({
      password: ['Password must have special characters'],
    });
  });

  it('validates as expected with invalid password (no special characters) and strict password policy', async () => {
    // does not have special character
    const password = 'UnitTestPassword1';
    const result = await validateFormPassword(
      { password },
      touched,
      strictPasswordPolicy
    );
    expect(result).toStrictEqual({
      password: ['Password must have special characters'],
    });
  });

  it('validates as expected with invalid password (fails all requirements) and strict password policy', async () => {
    // is too short, and does not meet any of character requirements but lowercase characters
    const password = 'short';
    const result = await validateFormPassword(
      { password },
      touched,
      strictPasswordPolicy
    );
    expect(result).toStrictEqual({
      password: [
        'Password must have at least 8 characters',
        'Password must have upper case letters',
        'Password must have numbers',
        'Password must have special characters',
      ],
    });
  });

  it('validates as expected with invalid password (fails all requirements but uppercase) and strict password policy', async () => {
    // is too short, and does not meet any of character requirements but uppercase characters
    const password = 'SHORT';
    const result = await validateFormPassword(
      { password },
      touched,
      strictPasswordPolicy
    );
    expect(result).toStrictEqual({
      password: [
        'Password must have at least 8 characters',
        'Password must have lower case letters',
        'Password must have numbers',
        'Password must have special characters',
      ],
    });
  });

  it('validates as expected with valid password and lenient password policy', async () => {
    const password = 'legitpassword123';
    const result = await validateFormPassword(
      { password },
      touched,
      lenientPasswordPolicy
    );
    expect(result).toBeNull();
  });

  it('validates as expected with invalid password and lenient password policy', async () => {
    const password = '123';
    const result = await validateFormPassword(
      { password },
      touched,
      lenientPasswordPolicy
    );
    expect(result).toStrictEqual({
      password: ['Password must have at least 4 characters'],
    });
  });

  it.each(ALLOWED_SPECIAL_CHARACTERS)(
    'validates usage of a %s character as expected',
    async (character) => {
      const password = `password${character}`;
      const result = await validateFormPassword({ password }, touched, {
        minLength: 4,
        requireSpecialCharacters: true,
      });
      expect(result).toBeNull();
    }
  );

  it('skips validation if inputs are not touched', async () => {
    const password = '';
    const result = await validateFormPassword(
      { password: password },
      untouched,
      strictPasswordPolicy
    );
    expect(result).toBeNull();
  });
});

describe('validateConfirmPassword', () => {
  it('validates as expected with valid password', async () => {
    const password = 'UnitTest_Password';
    const formData = {
      password: password,
      confirm_password: password,
    };
    const touchData = {
      password: true,
      confirm_password: true,
    };

    const result = await validateConfirmPassword(formData, touchData);

    expect(result).toBeUndefined();
  });

  it('returns null if password and confirm_password are both empty', async () => {
    const formData = {
      password: '',
      confirm_password: '',
    };
    const touchData = {
      password: false,
      confirm_password: false,
    };

    const result = await validateConfirmPassword(formData, touchData);

    expect(result).toBeNull();
  });
  it('returns an error if password and confirm_password do not match', async () => {
    const formData = {
      password: 'password1',
      confirm_password: 'password2',
    };

    const touchData = {
      password: false,
      confirm_password: false,
    };

    const result = await validateConfirmPassword(formData, touchData);

    expect(result).toEqual({
      confirm_password: 'Your passwords must match',
    });
  });

  it('returns an error if password and confirm_password are both entered and have length >= 6', async () => {
    const formData = {
      password: 'password1',
      confirm_password: 'password2',
    };
    const touchData = {
      password: true,
      confirm_password: true,
    };

    const result = await validateConfirmPassword(formData, touchData);

    expect(result).toEqual({
      confirm_password: 'Your passwords must match',
    });
  });

  it('does not return an error if password is entered and and confirm_password is not and has length < 6', async () => {
    const formData = {
      password: 'password1',
      confirm_password: 'pass',
    };
    const touchData = {
      password: true,
      confirm_password: false,
    };

    const result = await validateConfirmPassword(formData, touchData);

    expect(result).toBeUndefined();
  });
});

describe('getAmplifyConfig', () => {
  // @todo-migration
  // think we need to mock result here:
  //     TypeError: Cannot read properties of undefined (reading 'Auth')
  // > 21 |     const cliConfig = result.Cognito;
  it.skip('should call Amplify.configure', async () => {
    await getAmplifyConfig();

    expect(Amplify.getConfig).toHaveBeenCalledTimes(1);
  });
});

describe('validateFormPassword', () => {
  it('does nothing', async () => {
    const password = 'UnitTest_Password1';
    const result = await validateCustomSignUp({ password }, touched);
    expect(result).toBeUndefined();
  });
});

describe('validatePreferredUsername', () => {
  it('does nothing', async () => {
    const username = 'test';
    const result = await validatePreferredUsername({ username }, touched);
    expect(result).toBeUndefined();
  });
});
