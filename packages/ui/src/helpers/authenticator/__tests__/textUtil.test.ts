import {
  AuthMFAType,
  V6AuthDeliveryMedium,
} from '../../../machines/authenticator/types';

import { authenticatorTextUtil } from '../textUtil';
import { I18n } from 'aws-amplify/utils';
import { translations } from '../../../i18n';

describe('authenticatorTextUtil', () => {
  describe('getChallengeText', () => {
    it('returns the correct text for the "EMAIL_OTP" challenge', () => {
      expect(authenticatorTextUtil.getChallengeText('EMAIL_OTP')).toEqual(
        'Confirm Email Code'
      );
    });

    it('returns the correct text for the "SMS_MFA" challenge', () => {
      expect(authenticatorTextUtil.getChallengeText('SMS_MFA')).toEqual(
        'Confirm SMS Code'
      );
    });

    it('returns the correct text for the "SOFTWARE_TOKEN_MFA" challenge', () => {
      expect(
        authenticatorTextUtil.getChallengeText('SOFTWARE_TOKEN_MFA')
      ).toEqual('Confirm TOTP Code');
    });

    it('returns default text for unexpected challenge names', () => {
      expect(
        // @ts-expect-error
        authenticatorTextUtil.getChallengeText('invalidChallenge')
      ).toEqual('Confirm MFA Code');
    });
  });

  describe('getDeliveryMessageText', () => {
    it('returns the correct text for email delivery', () => {
      const codeDeliveryDetails = {
        DeliveryMedium: 'EMAIL' as V6AuthDeliveryMedium,
        Destination: 'user@example.com',
        AttributeName: '',
      };

      expect(
        authenticatorTextUtil.getDeliveryMessageText(codeDeliveryDetails)
      ).toEqual(
        'Your code is on the way. To log in, enter the code we emailed to user@example.com. It may take a minute to arrive.'
      );
    });

    it('returns the correct text for SMS delivery', () => {
      const codeDeliveryDetails = {
        DeliveryMedium: 'SMS' as V6AuthDeliveryMedium,
        Destination: '+1234567890',
        AttributeName: '',
      };

      expect(
        authenticatorTextUtil.getDeliveryMessageText(codeDeliveryDetails)
      ).toEqual(
        'Your code is on the way. To log in, enter the code we texted to +1234567890. It may take a minute to arrive.'
      );
    });

    it('returns the default text for other delivery methods', () => {
      const codeDeliveryDetails = {
        DeliveryMedium: 'INVALID_MEDIUM' as V6AuthDeliveryMedium,
        Destination: 'user@example.com',
        AttributeName: '',
      };

      expect(
        authenticatorTextUtil.getDeliveryMessageText(codeDeliveryDetails)
      ).toEqual(
        'Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.'
      );
    });
  });

  describe('getDeliveryMethodText', () => {
    it('returns the correct text for email delivery', () => {
      const codeDeliveryDetails = {
        DeliveryMedium: 'EMAIL' as V6AuthDeliveryMedium,
        Destination: 'user@example.com',
        AttributeName: '',
      };

      expect(
        authenticatorTextUtil.getDeliveryMethodText(codeDeliveryDetails)
      ).toEqual('We Emailed You');
    });

    it('returns the correct text for SMS delivery', () => {
      const codeDeliveryDetails = {
        DeliveryMedium: 'SMS' as V6AuthDeliveryMedium,
        Destination: '+1234567890',
        AttributeName: '',
      };

      expect(
        authenticatorTextUtil.getDeliveryMethodText(codeDeliveryDetails)
      ).toEqual('We Sent A Code');
    });
  });

  describe('getSignInWithFederationText', () => {
    it('returns the correct text for a "signIn" route', () => {
      const provider = 'google';
      expect(
        authenticatorTextUtil.getSignInWithFederationText('signIn', provider)
      ).toEqual('Sign In with Google');
    });
  });

  describe('getForgotPasswordText', () => {
    it('returns the correct text forgot password', () => {
      expect(authenticatorTextUtil.getForgotPasswordText(true)).toEqual(
        'Forgot Password?'
      );
    });
  });

  describe('getSelectMfaTypeByChallengeName', () => {
    it('returns the correct text when challengeName is MFA_SETUP', () => {
      expect(
        authenticatorTextUtil.getSelectMfaTypeByChallengeName('MFA_SETUP')
      ).toEqual('Multi-Factor Authentication Setup');
    });
    it('returns the correct text when challengeName is SELECT_MFA_TYPE', () => {
      expect(
        authenticatorTextUtil.getSelectMfaTypeByChallengeName('SELECT_MFA_TYPE')
      ).toEqual('Multi-Factor Authentication');
    });
  });

  describe('getMfaTypeLabelByValue', () => {
    const getMfaTypeLabelByValueTestCases: [AuthMFAType, string][] = [
      ['EMAIL', 'Email Message'],
      ['SMS', 'Text Message (SMS)'],
      ['TOTP', 'Authenticator App (TOTP)'],
    ];

    it.each(getMfaTypeLabelByValueTestCases)(
      'returns the correct text when value is %s',
      (input, output) => {
        expect(authenticatorTextUtil.getMfaTypeLabelByValue(input)).toEqual(
          output
        );
      }
    );
  });

  describe('getUsernameLabelByLoginMechanism', () => {
    it('returns "Email" for email login mechanism', () => {
      expect(
        authenticatorTextUtil.getUsernameLabelByLoginMechanism('email')
      ).toEqual('Email');
    });

    it('returns "Phone Number" for phone_number login mechanism', () => {
      expect(
        authenticatorTextUtil.getUsernameLabelByLoginMechanism('phone_number')
      ).toEqual('Phone Number');
    });

    it('returns "Username" for username login mechanism', () => {
      expect(
        authenticatorTextUtil.getUsernameLabelByLoginMechanism('username')
      ).toEqual('Username');
    });

    it('returns "Username" for undefined login mechanism', () => {
      expect(
        authenticatorTextUtil.getUsernameLabelByLoginMechanism(undefined)
      ).toEqual('Username');
    });
  });

  describe('authenticator shared text', () => {
    it('return a text for all the utils', () => {
      Object.entries(authenticatorTextUtil).map(([name, fn]) => {
        let result;
        if (name === 'getChallengeText') {
          result = fn.call(authenticatorTextUtil, 'SMS_MFA');
        } else if (name === 'getMfaTypeLabelByValue') {
          result = fn.call(authenticatorTextUtil, 'EMAIL');
        } else {
          result = fn.call(authenticatorTextUtil);
        }
        expect(result).toBeDefined();
      });
    });
  });
});

describe('getDeliveryMessageText locale punctuation (#6966)', () => {
  const emailDetails = {
    DeliveryMedium: 'EMAIL' as V6AuthDeliveryMedium,
    Destination: 'user@example.com',
    AttributeName: '',
  };
  const smsDetails = {
    DeliveryMedium: 'SMS' as V6AuthDeliveryMedium,
    Destination: '+1234567890',
    AttributeName: '',
  };
  const unknownDetails = {
    DeliveryMedium: 'INVALID_MEDIUM' as V6AuthDeliveryMedium,
    Destination: 'user@example.com',
    AttributeName: '',
  };

  // CJK locales use the ideographic full stop; Thai uses no terminator; every
  // other bundled locale (Latin/Cyrillic/Hangul) keeps the ASCII period.
  const CJK_LOCALES = ['ja', 'zh'] as const;
  const NO_ASCII_PERIOD_LOCALES = ['th'] as const;
  const ASCII_PERIOD_LOCALES = [
    'de',
    'es',
    'fr',
    'hu',
    'id',
    'it',
    'kr',
    'nb',
    'nl',
    'pl',
    'pt',
    'ru',
    'sv',
    'tr',
    'ua',
  ] as const;

  beforeEach(() => {
    // Restore canonical vocabularies so an override from a prior test cannot leak.
    I18n.putVocabularies(translations);
    I18n.setLanguage('en');
  });

  afterAll(() => {
    I18n.setLanguage('en');
  });

  it('renders Japanese email with the ideographic full stop after the destination and at the end, never an ASCII period', () => {
    I18n.setLanguage('ja');
    const result = authenticatorTextUtil.getDeliveryMessageText(emailDetails);

    expect(result).toContain('user@example.com。');
    expect(result).not.toContain('user@example.com. ');
    expect(result.endsWith('。')).toBe(true);
    expect(result.endsWith('.')).toBe(false);
  });

  it('renders Japanese SMS and unknown mediums terminated with the ideographic full stop', () => {
    I18n.setLanguage('ja');

    const sms = authenticatorTextUtil.getDeliveryMessageText(smsDetails);
    expect(sms).toContain('+1234567890。');
    expect(sms.endsWith('。')).toBe(true);

    const unknown =
      authenticatorTextUtil.getDeliveryMessageText(unknownDetails);
    expect(unknown.endsWith('。')).toBe(true);
    expect(unknown.endsWith('.')).toBe(false);
  });

  it.each(CJK_LOCALES)(
    'locale "%s" terminates every medium with the ideographic full stop, never an ASCII period',
    (locale) => {
      I18n.setLanguage(locale);
      for (const details of [emailDetails, smsDetails, unknownDetails]) {
        const result = authenticatorTextUtil.getDeliveryMessageText(details);
        expect(result.endsWith('。')).toBe(true);
        expect(result.endsWith('.')).toBe(false);
      }
    }
  );

  it.each(NO_ASCII_PERIOD_LOCALES)(
    'locale "%s" never terminates a delivery message with an ASCII period',
    (locale) => {
      I18n.setLanguage(locale);
      for (const details of [emailDetails, smsDetails, unknownDetails]) {
        const result = authenticatorTextUtil.getDeliveryMessageText(details);
        expect(result.endsWith('.')).toBe(false);
        expect(result.endsWith('。')).toBe(false);
      }
    }
  );

  it.each(ASCII_PERIOD_LOCALES)(
    'locale "%s" keeps the ASCII period and does not use the ideographic full stop',
    (locale) => {
      I18n.setLanguage(locale);
      for (const details of [emailDetails, smsDetails, unknownDetails]) {
        const result = authenticatorTextUtil.getDeliveryMessageText(details);
        expect(result.endsWith('.')).toBe(true);
        expect(result.endsWith('。')).toBe(false);
      }
    }
  );

  it('keeps English output byte-identical to the pre-fix strings', () => {
    I18n.setLanguage('en');
    expect(authenticatorTextUtil.getDeliveryMessageText(emailDetails)).toBe(
      'Your code is on the way. To log in, enter the code we emailed to user@example.com. It may take a minute to arrive.'
    );
    expect(authenticatorTextUtil.getDeliveryMessageText(smsDetails)).toBe(
      'Your code is on the way. To log in, enter the code we texted to +1234567890. It may take a minute to arrive.'
    );
    expect(authenticatorTextUtil.getDeliveryMessageText(unknownDetails)).toBe(
      'Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.'
    );
  });

  it('honors customer vocabulary overrides on the documented keys (confirm-sign-up pattern)', () => {
    I18n.putVocabulariesForLanguage('en', {
      'Your code is on the way. To log in, enter the code we emailed to':
        'Enter this code:',
      'It may take a minute to arrive':
        'It will take several minutes to arrive',
    });

    expect(authenticatorTextUtil.getDeliveryMessageText(emailDetails)).toBe(
      'Enter this code: user@example.com. It will take several minutes to arrive.'
    );
  });

  it('does not double terminal punctuation when an overridden fragment already ends with it', () => {
    I18n.putVocabulariesForLanguage('en', {
      'It may take a minute to arrive': 'Arrives soon.',
    });

    const result = authenticatorTextUtil.getDeliveryMessageText(emailDetails);
    expect(result.endsWith('Arrives soon.')).toBe(true);
    expect(result.endsWith('..')).toBe(false);
  });

  it('does not append a terminator when an override already ends with an ellipsis (no.2)', () => {
    I18n.putVocabulariesForLanguage('en', {
      'It may take a minute to arrive': 'Might take a minute or two…',
    });

    const result = authenticatorTextUtil.getDeliveryMessageText(emailDetails);
    expect(result.endsWith('Might take a minute or two…')).toBe(true);
    expect(result.endsWith('….')).toBe(false);
  });

  it('does not append a terminator when an override already ends with a colon (no.2)', () => {
    I18n.putVocabulariesForLanguage('en', {
      'It may take a minute to arrive': 'Enter this code:',
    });

    const result = authenticatorTextUtil.getDeliveryMessageText(emailDetails);
    expect(result.endsWith('Enter this code:')).toBe(true);
    expect(result.endsWith(':.')).toBe(false);
  });

  it('keeps the ASCII period when a Latin instruction override contains a CJK proper noun (no.1)', () => {
    I18n.putVocabulariesForLanguage('en', {
      'Your code is on the way. To log in, enter the code we emailed to':
        'Enter the code sent by 東京 team to',
    });

    const result = authenticatorTextUtil.getDeliveryMessageText(emailDetails);
    // Copy stays majority-Latin, so the ASCII period is kept, never `。`.
    expect(result).toContain('user@example.com.');
    expect(result).not.toContain('user@example.com。');
  });
});
