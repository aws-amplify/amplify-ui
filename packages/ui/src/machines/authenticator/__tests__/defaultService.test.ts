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
  it('validates as expected with valid password and strict password policy', async () => {
    const password = 'UnitTest_Password1';
    const result = await validateFormPassword(
      { password },
      touched,
      strictPasswordPolicy
    );
    expect(result).toBe(null);
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
    // is too short, and does not meet any of character requirements
    const password = 'short';
    const result = await validateFormPassword(
      { password },
      touched,
      strictPasswordPolicy
    );
    expect(result).toStrictEqual({
      password: [
        'Password must have at least 8 characters',
        'Password must have numbers',
        'Password must have upper case letters',
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
    expect(result).toBe(null);
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

  it('skips validation if inputs are not touched', async () => {
    const password = '';
    const result = await validateFormPassword(
      { password: password },
      untouched,
      strictPasswordPolicy
    );
    expect(result).toBe(null);
  });
});
