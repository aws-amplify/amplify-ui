import { Amplify } from 'aws-amplify';

import {
  getDefaultPasswordValidators,
  getMinLengthValidator,
  hasLowerCase,
  hasNumber,
  hasSpecialChar,
  hasUpperCase,
} from '../password';

const amplifyPasswordConfig = {
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [
      'REQUIRES_LOWERCASE',
      'REQUIRES_NUMBERS',
      'REQUIRES_SYMBOLS',
      'REQUIRES_UPPERCASE',
    ],
  },
};

const configureSpy = jest.spyOn(Amplify, 'configure');

describe('getMinLengthValidator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns minLength validator as expected', () => {
    const validator = getMinLengthValidator(4);
    expect(validator).toMatchObject({
      handler: expect.any(Function),
      message: 'Password must have at least 4 characters',
      validationMode: 'onTouched',
    });
  });

  it('validates to true when password is long enough', () => {
    const { handler } = getMinLengthValidator(4);
    const isValid = handler('longpassword');
    expect(isValid).toBe(true);
  });

  it('validates to false when password is too short', () => {
    const { handler } = getMinLengthValidator(4);
    const isValid = handler('hi');
    expect(isValid).toBe(false);
  });
});

describe('hasLowerCase', () => {
  it('validates to true when password has lower case', () => {
    const { handler } = hasLowerCase;
    const isValid = handler('password');
    expect(isValid).toBe(true);
  });

  it('validates to false when password has no lower case', () => {
    const { handler } = hasLowerCase;
    const isValid = handler('PASSWORD');
    expect(isValid).toBe(false);
  });
});

describe('hasUpperCase', () => {
  it('validates to true when password has upper case', () => {
    const { handler } = hasUpperCase;
    const isValid = handler('PASSWORD');
    expect(isValid).toBe(true);
  });

  it('validates to false when password has no upper case', () => {
    const { handler } = hasUpperCase;
    const isValid = handler('password');
    expect(isValid).toBe(false);
  });
});

describe('hasNumber', () => {
  it('validates to true when password has number', () => {
    const { handler } = hasNumber;
    const isValid = handler('password123');
    expect(isValid).toBe(true);
  });

  it('validates to false when password has no number', () => {
    const { handler } = hasNumber;
    const isValid = handler('password');
    expect(isValid).toBe(false);
  });
});

describe('hasSpecialChar', () => {
  it('validates to true when password has special character', () => {
    const { handler } = hasSpecialChar;
    const isValid = handler('password!');
    expect(isValid).toBe(true);
  });

  it('validates to false when password has no special character', () => {
    const { handler } = hasSpecialChar;
    const isValid = handler('password');
    expect(isValid).toBe(false);
  });
});

describe('getDefaultPasswordValidators', () => {
  it('returns empty array if passwordSettings is empty', () => {
    configureSpy.mockReturnValue({});
    const validators = getDefaultPasswordValidators();
    expect(validators).toStrictEqual([]);
  });

  it.only('returns validators as expected for nonempty passwordSetting', () => {
    configureSpy.mockReturnValue(amplifyPasswordConfig);
    const validators = getDefaultPasswordValidators();
    expect(validators).toMatchSnapshot();
  });
});
