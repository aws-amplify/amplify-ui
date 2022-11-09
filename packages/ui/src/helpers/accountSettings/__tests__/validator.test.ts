import { Amplify } from 'aws-amplify';

import {
  getDefaultPasswordValidators,
  getHasMinLength,
  getPasswordRequirement,
  hasLowerCase,
  hasNumber,
  hasSpecialChar,
  hasUpperCase,
  getMatchesConfirmPassword,
} from '../validator';

const partialAmplifyPasswordConfig = {
  aws_cognito_password_protection_settings: {
    passwordPolicyCharacters: ['REQUIRES_LOWERCASE', 'REQUIRES_UPPERCASE'],
  },
};

const fullAmplifyPasswordConfig = {
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

describe('getHasMinLength', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns minLength validator as expected', () => {
    const validator = getHasMinLength(4);
    expect(validator).toMatchObject({
      validator: expect.any(Function),
      message: 'Password must have at least 4 characters',
      validationMode: 'onTouched',
    });
  });

  it('validates to true when password is long enough', () => {
    const { validator } = getHasMinLength(4);
    const isValid = validator('longpassword');
    expect(isValid).toBe(true);
  });

  it('validates to false when password is too short', () => {
    const { validator } = getHasMinLength(4);
    const isValid = validator('hi');
    expect(isValid).toBe(false);
  });
});

describe('hasLowerCase', () => {
  it('validates to true when password has lower case', () => {
    const { validator } = hasLowerCase;
    const isValid = validator('password');
    expect(isValid).toBe(true);
  });

  it('validates to false when password has no lower case', () => {
    const { validator } = hasLowerCase;
    const isValid = validator('PASSWORD');
    expect(isValid).toBe(false);
  });
});

describe('hasUpperCase', () => {
  it('validates to true when password has upper case', () => {
    const { validator } = hasUpperCase;
    const isValid = validator('PASSWORD');
    expect(isValid).toBe(true);
  });

  it('validates to false when password has no upper case', () => {
    const { validator } = hasUpperCase;
    const isValid = validator('password');
    expect(isValid).toBe(false);
  });
});

describe('hasNumber', () => {
  it('validates to true when password has number', () => {
    const { validator } = hasNumber;
    const isValid = validator('password123');
    expect(isValid).toBe(true);
  });

  it('validates to false when password has no number', () => {
    const { validator } = hasNumber;
    const isValid = validator('password');
    expect(isValid).toBe(false);
  });
});

describe('hasSpecialChar', () => {
  it('validates to true when password has special character', () => {
    const { validator } = hasSpecialChar;
    const isValid = validator('password!');
    expect(isValid).toBe(true);
  });

  it('validates to false when password has no special character', () => {
    const { validator } = hasSpecialChar;
    const isValid = validator('password');
    expect(isValid).toBe(false);
  });
});

describe('getPasswordRequirement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null if Amplify.configure() is empty', () => {
    configureSpy.mockReturnValue({});
    const requirements = getPasswordRequirement();
    expect(requirements).toBeNull();
  });

  it('returns expected password requirements if full amplify config', () => {
    configureSpy.mockReturnValue(fullAmplifyPasswordConfig);
    const requirements = getPasswordRequirement();
    expect(requirements).toMatchObject({
      minLength: 8,
      needsLowerCase: true,
      needsNumber: true,
      needsSpecialChar: true,
      needsUpperCase: true,
    });
  });

  it('returns expected password requirements if partial amplify config', () => {
    configureSpy.mockReturnValue(partialAmplifyPasswordConfig);
    const requirements = getPasswordRequirement();
    expect(requirements).toMatchObject({
      needsLowerCase: true,
      needsNumber: false,
      needsSpecialChar: false,
      needsUpperCase: true,
    });
  });
});

describe('getDefaultPasswordValidators', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns validators as expected for partial Amplify config ', () => {
    configureSpy.mockReturnValue(partialAmplifyPasswordConfig);
    const validators = getDefaultPasswordValidators();
    expect(validators).toMatchSnapshot();
  });

  it('returns validators as expected for full Amplify config ', () => {
    configureSpy.mockReturnValue(fullAmplifyPasswordConfig);
    const validators = getDefaultPasswordValidators();
    expect(validators).toMatchSnapshot();
  });

  it('returns empty array for empty amplify config', () => {
    configureSpy.mockReturnValue({});
    const validators = getDefaultPasswordValidators();
    expect(validators).toStrictEqual([]);
  });
});

describe('getConfirmPassword', () => {
  it('returns confirm password valiator as expected', () => {
    const validator = getMatchesConfirmPassword('pw');
    expect(validator).toMatchObject({
      validator: expect.any(Function),
      message: 'Your passwords must match',
      validationMode: 'onTouched',
    });
  });

  it('validates to true when passwords match', () => {
    const { validator } = getMatchesConfirmPassword('myPassword');
    const isValid = validator('myPassword');
    expect(isValid).toBe(true);
  });

  it('validates to false when passwords do not match', () => {
    const { validator } = getMatchesConfirmPassword('myPassword');
    const isValid = validator('mismatchingPassword');
    expect(isValid).toBe(false);
  });
});
