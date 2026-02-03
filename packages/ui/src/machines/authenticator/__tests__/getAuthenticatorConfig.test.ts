import { getAuthenticatorConfig } from '../getAuthenticatorConfig';

describe('getAuthenticatorConfig', () => {
  it('parses login mechanisms', () => {
    const result = getAuthenticatorConfig({
      aws_cognito_username_attributes: ['EMAIL', 'PHONE_NUMBER'],
    });
    expect(result.loginMechanisms).toEqual(['email', 'phone_number']);
  });

  it('parses signup attributes', () => {
    const result = getAuthenticatorConfig({
      aws_cognito_signup_attributes: ['NAME', 'EMAIL'],
    });
    expect(result.signUpAttributes).toContain('name');
    expect(result.signUpAttributes).toContain('email');
  });

  it('combines signup and verification attributes', () => {
    const result = getAuthenticatorConfig({
      aws_cognito_signup_attributes: ['NAME'],
      aws_cognito_verification_mechanisms: ['EMAIL'],
    });
    expect(result.signUpAttributes).toContain('name');
    expect(result.signUpAttributes).toContain('email');
  });

  it('parses social providers', () => {
    const result = getAuthenticatorConfig({
      aws_cognito_social_providers: ['GOOGLE', 'FACEBOOK'],
    });
    expect(result.socialProviders).toEqual(['google', 'facebook']);
  });

  it('parses password settings', () => {
    const settings = { minLength: 8 };
    const result = getAuthenticatorConfig({
      aws_cognito_password_protection_settings: settings,
    });
    expect(result.passwordSettings).toEqual(settings);
  });
});
