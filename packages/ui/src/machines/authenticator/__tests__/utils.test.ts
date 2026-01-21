import { LoginMechanism } from '../../../types';
import { AuthActorContext } from '../types';
import { getUserAttributes, getSignUpInput, getUsernameSignUp } from '../utils';

describe('getUserAttributes', () => {
  it('returns the phone_number attribute as expected when provided', () => {
    const formValues = { country_code: '+26', phone_number: '8002428976' };
    const output = getUserAttributes(formValues);

    const expected = { phone_number: '+268002428976' };
    expect(output).toStrictEqual(expected);
  });

  it('does not returns the phone_number attribute when undefined', () => {
    const formValues = {
      email: 'example@example.com',
      country_code: '+1',
      phone_number: undefined,
    };
    const output = getUserAttributes(formValues);

    const expected = { email: 'example@example.com' };
    expect(output).toStrictEqual(expected);
  });

  it('returns an undefined value phone_number attribute when phone_number is an empty string', () => {
    const formValues = {
      email: 'example@example.com',
      country_code: '+1',
      phone_number: '',
    };
    const output = getUserAttributes(formValues);

    const expected = { email: 'example@example.com' };
    expect(output).toStrictEqual(expected);
  });
});

describe('getSignUpInput', () => {
  it('returns the expected values when loginMechanism is phone_number', () => {
    const username = '+268002428976';

    const formValues = {
      phone_number: '8002428976',
      password: 'a_password',
      confirm_password: 'a_password',
      email: 'example@example.com',
      country_code: '+26',
    };

    const output = getSignUpInput(username, formValues, 'phone_number');

    expect(output).toStrictEqual({
      options: {
        autoSignIn: true,
        userAttributes: {
          email: 'example@example.com',
          phone_number: '+268002428976',
        },
      },
      password: 'a_password',
      username: '+268002428976',
    });
  });
});

describe('getUsernameSignUp', () => {
  it('returns the expected values when loginMechanism is phone_number', () => {
    const formValues = {
      username: undefined,
      phone_number: '8002428976',
      password: 'a_password',
      confirm_password: 'a_password',
      email: 'example@example.com',
      country_code: '+26',
    };

    const output = getUsernameSignUp({
      formValues,
      loginMechanisms: ['phone_number' as LoginMechanism],
    } as unknown as AuthActorContext);

    const expected = '+268002428976';
    expect(output).toEqual(expected);
  });

  it('returns sanitized phone when only phone_number is a login mechanism (phone as username mode)', () => {
    const formValues = {
      phone_number: '8002428976',
      country_code: '+1',
      password: 'P@ssw0rd',
      confirm_password: 'P@ssw0rd',
    };

    const output = getUsernameSignUp({
      formValues,
      loginMechanisms: ['phone_number'] as LoginMechanism[],
    } as unknown as AuthActorContext);

    // When phone_number is the only mechanism (not alias mode), use it as username
    expect(output).toEqual('+18002428976');
  });

  it('returns username when username, email, and phone_number are all login mechanisms regardless order', () => {
    const formValues = {
      username: 'testuser',
      email: 'test@example.com',
      phone_number: '8002428976',
      country_code: '+1',
      password: 'P@ssw0rd',
      confirm_password: 'P@ssw0rd',
    };

    const output = getUsernameSignUp({
      formValues,
      loginMechanisms: [
        'email',
        'username',
        'phone_number',
      ] as LoginMechanism[],
    } as unknown as AuthActorContext);

    expect(output).toEqual('testuser');
  });

  it('returns email when email is the primary login mechanism', () => {
    const formValues = {
      email: 'test@example.com',
      password: 'P@ssw0rd',
      confirm_password: 'P@ssw0rd',
    };

    const output = getUsernameSignUp({
      formValues,
      loginMechanisms: ['email'] as LoginMechanism[],
    } as unknown as AuthActorContext);

    expect(output).toEqual('test@example.com');
  });
});

describe('passwordless utils', () => {
  const { getAvailableAuthMethods } = require('../utils');

  it('should return PASSWORD by default', () => {
    const result = getAvailableAuthMethods();
    expect(result).toEqual(['PASSWORD']);
  });

  it('should include EMAIL_OTP when enabled', () => {
    const result = getAvailableAuthMethods({
      emailOtpEnabled: true,
      smsOtpEnabled: false,
      webAuthnEnabled: false,
    });
    expect(result).toContain('EMAIL_OTP');
  });

  it('should include SMS_OTP when enabled', () => {
    const result = getAvailableAuthMethods({
      emailOtpEnabled: false,
      smsOtpEnabled: true,
      webAuthnEnabled: false,
    });
    expect(result).toContain('SMS_OTP');
  });

  it('should include WEB_AUTHN when enabled', () => {
    const result = getAvailableAuthMethods({
      emailOtpEnabled: false,
      smsOtpEnabled: false,
      webAuthnEnabled: true,
    });
    expect(result).toContain('WEB_AUTHN');
  });

  it('should filter hidden methods', () => {
    const result = getAvailableAuthMethods(
      {
        emailOtpEnabled: true,
        smsOtpEnabled: true,
        webAuthnEnabled: true,
      },
      ['EMAIL_OTP']
    );
    expect(result).not.toContain('EMAIL_OTP');
    expect(result).toContain('PASSWORD');
  });
});

describe('getSignUpInput', () => {
  const { getSignUpInput } = require('../utils');

  it('should return sign up input with password for PASSWORD auth', () => {
    const result = getSignUpInput(
      'testuser',
      {
        username: 'testuser',
        password: 'Test123!',
        email: 'test@example.com',
      },
      'username'
    );

    expect(result.username).toBe('testuser');
    expect(result.password).toBe('Test123!');
    expect(result.options?.autoSignIn).toBe(true);
  });

  it('should return sign up input without password for passwordless auth', () => {
    const result = getSignUpInput(
      'test@example.com',
      {
        email: 'test@example.com',
        password: 'Test123!',
      },
      'email',
      'EMAIL_OTP'
    );

    expect(result.username).toBe('test@example.com');
    expect(result.password).toBeUndefined();
    expect(result.options?.autoSignIn).toEqual({
      enabled: true,
      authFlowType: 'USER_AUTH',
      preferredChallenge: 'EMAIL_OTP',
    });
  });

  it('should handle phone number as username', () => {
    const result = getSignUpInput(
      '+11234567890',
      {
        username: '1234567890',
        country_code: '+1',
        password: 'Test123!',
      },
      'phone_number'
    );

    expect(result.username).toBe('+11234567890');
    expect(result.options?.userAttributes?.phone_number).toBe('+11234567890');
  });

  it('should not include phone_number in attributes for non-phone login', () => {
    const result = getSignUpInput(
      'test@example.com',
      {
        email: 'test@example.com',
        password: 'Test123!',
        name: 'Test User',
      },
      'email'
    );

    expect(result.options?.userAttributes?.phone_number).toBeUndefined();
    expect(result.options?.userAttributes?.name).toBe('Test User');
  });
});

describe('getUserAttributes', () => {
  const { getUserAttributes } = require('../utils');

  it('should handle standard attributes', () => {
    const result = getUserAttributes({
      email: 'test@example.com',
      name: 'Test User',
      family_name: 'User',
      given_name: 'Test',
    });

    expect(result.email).toBe('test@example.com');
    expect(result.name).toBe('Test User');
    expect(result.family_name).toBe('User');
    expect(result.given_name).toBe('Test');
  });

  it('should handle custom attributes with custom: prefix', () => {
    const result = getUserAttributes({
      'custom:department': 'Engineering',
      'custom:employee_id': '12345',
    });

    expect(result['custom:department']).toBe('Engineering');
    expect(result['custom:employee_id']).toBe('12345');
  });

  it('should filter out non-attribute fields', () => {
    const result = getUserAttributes({
      email: 'test@example.com',
      password: 'secret',
      confirm_password: 'secret',
      username: 'testuser',
    });

    expect(result.email).toBe('test@example.com');
    expect(result.password).toBeUndefined();
    expect(result.confirm_password).toBeUndefined();
    expect(result.username).toBeUndefined();
  });
});
