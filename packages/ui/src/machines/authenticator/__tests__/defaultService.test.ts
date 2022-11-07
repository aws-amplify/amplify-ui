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

describe('validateFormPassword', () => {
  it('validates as expected with valid password', async () => {
    const password = 'UnitTest_Password1';
    const result = await validateFormPassword(
      { password },
      touched,
      strictPasswordPolicy
    );
    expect(result).toBeNull();
  });

  it('validates as expected with invalid password', async () => {
    const password = 'badpw';
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
