import {
  AuthMFAType,
  V6AuthDeliveryMedium,
} from '../../../machines/authenticator/types';

import { authenticatorTextUtil } from '../textUtil';

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
