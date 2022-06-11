import { PasswordSettings } from '../../../types';
import { defaultServices } from '../defaultServices';

const { validateFormPassword } = defaultServices;

const untouched = { password: false };
const touched = { password: true };

const strictPasswordPolicy: PasswordSettings = {
  passwordPolicyCharacters: [
    'REQUIRES_LOWERCASE',
    'REQUIRES_NUMBERS',
    'REQUIRES_UPPERCASE',
    'REQUIRES_SYMBOLS',
  ],
  passwordPolicyMinLength: 8,
};

const lenientPasswordPolicy: PasswordSettings = {
  passwordPolicyCharacters: [],
  passwordPolicyMinLength: 4,
};

describe('validateFormPassword', () => {
  it('happy case with valid password and strict password policy', async () => {
    const password = 'UnitTest_Password1';
    const result = await validateFormPassword(
      { password },
      touched,
      strictPasswordPolicy
    );
    expect(result).toBe(null);
  });

  it('unhappy cases with invalid passwords and strict password policy', async () => {
    // has special character not recognized by Cognito
    const password1 = 'UnitTestㄱPassword1';
    const result1 = await validateFormPassword(
      { password: password1 },
      touched,
      strictPasswordPolicy
    );
    expect(result1).toStrictEqual({
      password: ['Password must have special characters'],
    });

    // does not have special character
    const password2 = 'UnitTestPassword1';
    const result2 = await validateFormPassword(
      { password: password2 },
      touched,
      strictPasswordPolicy
    );
    expect(result2).toStrictEqual({
      password: ['Password must have special characters'],
    });

    // is too short, and does not meet character requirements
    const password3 = 'short';
    const result3 = await validateFormPassword(
      { password: password3 },
      touched,
      strictPasswordPolicy
    );
    expect(result3).toStrictEqual({
      password: [
        'Password must have at least 8 characters',
        'Password must have numbers',
        'Password must have upper case letters',
        'Password must have special characters',
      ],
    });
  });

  it('happy case with valid password and lenient password policy', async () => {
    const password = 'legitpassword123';
    const result = await validateFormPassword(
      { password: password },
      touched,
      lenientPasswordPolicy
    );
    expect(result).toBe(null);
  });

  it('unhappy case with valid password and lenient password policy', async () => {
    const password = '123';
    const result = await validateFormPassword(
      { password: password },
      touched,
      lenientPasswordPolicy
    );
    expect(result).toStrictEqual({
      password: ['Password must have at least 4 characters'],
    });
  });

  it('validation is skipped if inputs are not touched', async () => {
    const password = '';
    const result = await validateFormPassword(
      { password: password },
      untouched,
      strictPasswordPolicy
    );
    expect(result).toBe(null);
  });
});
