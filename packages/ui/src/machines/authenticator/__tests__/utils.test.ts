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
