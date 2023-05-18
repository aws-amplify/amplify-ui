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
  shouldValidate,
  runFieldValidators,
  getDefaultConfirmPasswordValidators,
} from '../validator';
import { ValidatorOptions } from '../../../types';

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

describe('shouldValidate', () => {
  it('returns true when validationMode is onBlur eventType is blur', () => {
    const result = shouldValidate({
      validationMode: 'onBlur',
      eventType: 'blur',
      hasBlurred: false,
    });

    expect(result).toBe(true);
  });

  it('returns false when validationMode is onBlur and eventType is not blur', () => {
    const result = shouldValidate({
      validationMode: 'onBlur',
      eventType: 'change',
      hasBlurred: false,
    });

    expect(result).toBe(false);
  });

  it('returns true when validationMode is onChange and eventType is change', () => {
    const result = shouldValidate({
      validationMode: 'onChange',
      eventType: 'change',
      hasBlurred: false,
    });

    expect(result).toBe(true);
  });

  it('returns true when validationMode is onTouched and eventType is blur and hasBlurred is false', () => {
    const result = shouldValidate({
      validationMode: 'onTouched',
      eventType: 'blur',
      hasBlurred: false,
    });

    expect(result).toBe(true);
  });

  it('returns false when validationMode is onTouched and eventType is change and hasBlurred is false', () => {
    const result = shouldValidate({
      validationMode: 'onTouched',
      eventType: 'change',
      hasBlurred: false,
    });

    expect(result).toBe(false);
  });
});

describe('runFieldValidators', () => {
  it('returns an empty array when there are no validators', () => {
    const value = 'test';
    const validators = [];
    const eventType = 'blur';
    const hasBlurred = false;
    const result = runFieldValidators({
      value,
      validators,
      eventType,
      hasBlurred,
    });
    expect(result).toEqual([]);
  });

  it('returns an empty array when the value is empty', () => {
    const value = '';
    const validators: ValidatorOptions[] = [
      { validator: () => true, validationMode: 'onBlur', message: 'error' },
    ];
    const eventType = 'blur';
    const hasBlurred = false;
    const result = runFieldValidators({
      value,
      validators,
      eventType,
      hasBlurred,
    });
    expect(result).toEqual([]);
  });

  it('returns an error message when a validator fails', () => {
    const value = 'test';
    const validators: ValidatorOptions[] = [
      {
        validator: (value) => value === 'pass',
        validationMode: 'onBlur',
        message: 'error',
      },
    ];
    const eventType = 'blur';
    const hasBlurred = false;
    const result = runFieldValidators({
      value,
      validators,
      eventType,
      hasBlurred,
    });
    expect(result).toEqual(['error']);
  });

  it('returns an empty array when all validators pass', () => {
    const value = 'pass';
    const validators: ValidatorOptions[] = [
      {
        validator: (value) => value === 'pass',
        validationMode: 'onBlur',
        message: 'error',
      },
    ];
    const eventType = 'blur';
    const hasBlurred = false;
    const result = runFieldValidators({
      value,
      validators,
      eventType,
      hasBlurred,
    });
    expect(result).toEqual([]);
  });

  it('returns previous errors when a validator returns an error message', () => {
    const value = 'test';
    const validators: ValidatorOptions[] = [
      {
        validator: (val: string) => val === 'other',
        validationMode: 'onChange',
        message: 'Value is not correct',
      },
      {
        validator: (val: string) => val.length > 5,
        validationMode: 'onBlur',
        message: 'Value must be longer than 5 characters',
      },
    ];
    const eventType = 'change';
    const hasBlurred = true;

    const result = runFieldValidators({
      value,
      validators,
      eventType,
      hasBlurred,
    });
    expect(result).toEqual(['Value is not correct']);
  });
});

describe('getDefaultConfirmPasswordValidators', () => {
  it('returns an array with one validator', () => {
    const password = 'password';
    const validators = getDefaultConfirmPasswordValidators(password);
    expect(validators).toHaveLength(1);
  });
});
