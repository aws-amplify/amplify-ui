import { PasswordSettings } from '../../../types';
import { ALLOWED_SPECIAL_CHARACTERS } from '../../../helpers/authenticator/constants';
import { defaultPasswordValidator } from '../validator';

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
    const result = defaultPasswordValidator(password, strictPasswordPolicy);
    expect(result).toStrictEqual([]);
  });

  it('validates as expected with invalid password (has unknown special character) and strict password policy', async () => {
    // has special character not recognized by Cognito
    const password = 'UnitTestㄱPassword1';
    const result = defaultPasswordValidator(password, strictPasswordPolicy);
    expect(result).toStrictEqual(['Password must have special characters']);
  });

  it('validates as expected with invalid password (no special characters) and strict password policy', async () => {
    // does not have special character
    const password = 'UnitTestPassword1';
    const result = defaultPasswordValidator(password, strictPasswordPolicy);
    expect(result).toStrictEqual(['Password must have special characters']);
  });

  it('validates as expected with invalid password (fails all requirements) and strict password policy', async () => {
    // is too short, and does not meet any of character requirements
    const password = 'short';
    const result = defaultPasswordValidator(password, strictPasswordPolicy);
    expect(result).toStrictEqual([
      'Password must have at least 8 characters',
      'Password must have numbers',
      'Password must have upper case letters',
      'Password must have special characters',
    ]);
  });

  it('validates as expected with valid password and lenient password policy', async () => {
    const password = 'legitpassword123';
    const result = defaultPasswordValidator(password, lenientPasswordPolicy);
    expect(result).toStrictEqual([]);
  });

  it('validates as expected with invalid password and lenient password policy', async () => {
    const password = '123';
    const result = defaultPasswordValidator(password, lenientPasswordPolicy);
    expect(result).toStrictEqual(['Password must have at least 4 characters']);
  });

  it.each(ALLOWED_SPECIAL_CHARACTERS)(
    'validates usage of a %s character as expected',
    async (character) => {
      const password = `password${character}`;
      const result = defaultPasswordValidator(password, {
        passwordPolicyMinLength: 4,
        passwordPolicyCharacters: ['REQUIRES_SYMBOLS'],
      });
      expect(result).toStrictEqual([]);
    }
  );
});
