import { I18n } from 'aws-amplify/utils';

import {
  AuthMFAType,
  V6AuthDeliveryMedium,
} from '../../../machines/authenticator/types';

import { authenticatorTextUtil } from '../textUtil';
import { jaDict } from '../../../i18n/dictionaries';
import { DefaultTexts, translate, translations } from '../../../i18n';

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

describe('getDeliveryMessageText i18n punctuation (#6966)', () => {
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

  beforeAll(() => {
    I18n.putVocabulariesForLanguage('ja', jaDict);
    I18n.setLanguage('ja');
  });

  afterAll(() => {
    I18n.setLanguage('en');
  });

  it('renders email delivery with locale punctuation, not a hardcoded ASCII period', () => {
    const result = authenticatorTextUtil.getDeliveryMessageText(emailDetails);

    expect(result).toBe(
      'ログインするには、メールに記載されたコードを入力してください。送信先: user@example.com。コードを受信するまで数分かかる場合があります。'
    );
    // the destination is followed by the ideographic full stop, not ". "
    expect(result).toContain('user@example.com。');
    expect(result).not.toContain('user@example.com. ');
    // the message ends with the ideographic full stop, not an ASCII period
    expect(result.endsWith('。')).toBe(true);
    expect(result.endsWith('.')).toBe(false);
  });

  it('renders SMS delivery with locale punctuation, not a hardcoded ASCII period', () => {
    const result = authenticatorTextUtil.getDeliveryMessageText(smsDetails);

    expect(result).toBe(
      'ログインするには、テキストメッセージに記載されたコードを入力してください。送信先: +1234567890。コードを受信するまで数分かかる場合があります。'
    );
    expect(result).toContain('+1234567890。');
    expect(result).not.toContain('+1234567890. ');
    expect(result.endsWith('。')).toBe(true);
  });

  it('renders unknown delivery mediums with locale punctuation', () => {
    const result = authenticatorTextUtil.getDeliveryMessageText(unknownDetails);

    expect(result).toBe(
      'コードが途中です。ログインするには、送信したコードを入力してください。コードを受信するまで数分かかる場合があります。'
    );
    expect(result.endsWith('。')).toBe(true);
    expect(result.endsWith('.')).toBe(false);
  });
});

// Every locale that received the composite delivery keys must resolve them
// (and the arrival phrase) in-locale, never falling back to English. This
// guards against the #6968 gap where CODE_ARRIVAL gained a trailing period
// but several locales lacked the period-inclusive key.
const UPDATED_LOCALES = [
  'de',
  'es',
  'fr',
  'hu',
  'id',
  'it',
  'ja',
  'kr',
  'nb',
  'nl',
  'pl',
  'pt',
  'ru',
  'sv',
  'th',
  'tr',
  'ua',
  'zh',
] as const;

describe('getDeliveryMessageText resolves in-locale for every supported locale (#6966)', () => {
  const emailDetails = {
    DeliveryMedium: 'EMAIL' as V6AuthDeliveryMedium,
    Destination: 'user@example.com',
    AttributeName: '',
  };
  const englishEmail =
    'Your code is on the way. To log in, enter the code we emailed to user@example.com. It may take a minute to arrive.';

  beforeAll(() => {
    UPDATED_LOCALES.forEach((locale) => {
      I18n.putVocabulariesForLanguage(locale, translations[locale]);
    });
  });

  afterAll(() => {
    I18n.setLanguage('en');
  });

  it.each(UPDATED_LOCALES)(
    'locale "%s" translates the arrival phrase (no English fallback)',
    (locale) => {
      I18n.setLanguage(locale);
      expect(translate(DefaultTexts.CODE_ARRIVAL)).not.toBe(
        DefaultTexts.CODE_ARRIVAL
      );
    }
  );

  it.each(UPDATED_LOCALES)(
    'locale "%s" renders a fully interpolated, non-English email message',
    (locale) => {
      I18n.setLanguage(locale);
      const result = authenticatorTextUtil.getDeliveryMessageText(emailDetails);

      // destination interpolated, no leftover placeholders
      expect(result).toContain('user@example.com');
      expect(result).not.toMatch(/\{[a-zA-Z]+\}/);
      // genuinely localized, not the English fallback string
      expect(result).not.toBe(englishEmail);
    }
  );
});
