import { getAvailableAuthMethods, getPreferredAuthMethod } from '../utils';
import type {
  PasswordlessCapabilities,
  PasswordlessAuthOptions,
} from '../types';

describe('getAvailableAuthMethods', () => {
  const mockCapabilities: PasswordlessCapabilities = {
    emailOtpEnabled: false,
    smsOtpEnabled: false,
    webAuthnEnabled: false,
  };

  it('should return only PASSWORD when no passwordless methods enabled', () => {
    const result = getAvailableAuthMethods(mockCapabilities);
    expect(result).toEqual(['PASSWORD']);
  });

  it('should return PASSWORD and EMAIL_OTP when email OTP enabled', () => {
    const result = getAvailableAuthMethods({
      ...mockCapabilities,
      emailOtpEnabled: true,
    });
    expect(result).toEqual(['PASSWORD', 'EMAIL_OTP']);
  });

  it('should return PASSWORD and SMS_OTP when SMS OTP enabled', () => {
    const result = getAvailableAuthMethods({
      ...mockCapabilities,
      smsOtpEnabled: true,
    });
    expect(result).toEqual(['PASSWORD', 'SMS_OTP']);
  });

  it('should return PASSWORD and WEB_AUTHN when WebAuthn enabled', () => {
    const result = getAvailableAuthMethods({
      ...mockCapabilities,
      webAuthnEnabled: true,
    });
    expect(result).toEqual(['PASSWORD', 'WEB_AUTHN']);
  });

  it('should return all methods when all enabled', () => {
    const result = getAvailableAuthMethods({
      emailOtpEnabled: true,
      smsOtpEnabled: true,
      webAuthnEnabled: true,
    });
    expect(result).toEqual(['PASSWORD', 'EMAIL_OTP', 'SMS_OTP', 'WEB_AUTHN']);
  });

  it('should filter out hidden methods', () => {
    const result = getAvailableAuthMethods(
      {
        emailOtpEnabled: true,
        smsOtpEnabled: true,
        webAuthnEnabled: true,
      },
      ['PASSWORD', 'SMS_OTP']
    );
    expect(result).toEqual(['EMAIL_OTP', 'WEB_AUTHN']);
  });

  it('should throw error when all methods are hidden', () => {
    expect(() =>
      getAvailableAuthMethods(
        {
          emailOtpEnabled: true,
          smsOtpEnabled: false,
          webAuthnEnabled: false,
        },
        ['PASSWORD', 'EMAIL_OTP', 'SMS_OTP', 'WEB_AUTHN']
      )
    ).toThrow(
      'InvalidPasswordlessAuthOptions: All authentication methods are hidden'
    );
  });

  it('should handle undefined capabilities by returning only PASSWORD', () => {
    const result = getAvailableAuthMethods(undefined as any);
    expect(result).toEqual(['PASSWORD']);
  });

  it('should handle undefined hiddenAuthMethods', () => {
    const result = getAvailableAuthMethods({
      emailOtpEnabled: true,
      smsOtpEnabled: false,
      webAuthnEnabled: false,
    });
    expect(result).toEqual(['PASSWORD', 'EMAIL_OTP']);
  });
});

describe('getPreferredAuthMethod', () => {
  it('should return preferred method when specified and available', () => {
    const result = getPreferredAuthMethod(
      ['PASSWORD', 'EMAIL_OTP', 'SMS_OTP'],
      'EMAIL_OTP'
    );
    expect(result).toBe('EMAIL_OTP');
  });

  it('should return first available method when preferred not specified', () => {
    const result = getPreferredAuthMethod(['PASSWORD', 'EMAIL_OTP']);
    expect(result).toBe('PASSWORD');
  });

  it('should return first available method when preferred not available', () => {
    const result = getPreferredAuthMethod(['PASSWORD', 'EMAIL_OTP'], 'SMS_OTP');
    expect(result).toBe('PASSWORD');
  });

  it('should return first available method when empty array', () => {
    const result = getPreferredAuthMethod([]);
    expect(result).toBeUndefined();
  });

  it('should return first available method when undefined', () => {
    const result = getPreferredAuthMethod(undefined as any);
    expect(result).toBeUndefined();
  });
});
