import { I18n } from 'aws-amplify/utils';
import { SocialProvider } from '../../../types';
import {
  ChallengeName,
  V5CodeDeliveryDetails,
} from '../../../machines/authenticator/types';
import { authenticatorTextUtil } from '../textUtil';

const AUTH_CHALLENGE_NAMES: ChallengeName[] = [
  'SMS_MFA',
  'SOFTWARE_TOKEN_MFA',
  'EMAIL_OTP',
];

const SOCIAL_PROVIDERS: SocialProvider[] = [
  'apple',
  'amazon',
  'facebook',
  'google',
];

const CODE_DELIVERY_DETAILS: Array<V5CodeDeliveryDetails['DeliveryMedium']> = [
  'SMS',
  'EMAIL',
];

I18n.setLanguage('en-us');
describe('authenticatorTextUtil', () => {
  beforeEach(() => {
    // reset translations
    I18n.putVocabulariesForLanguage('en-us', { 'Sign in': 'Sign in' });
  });

  it('should reflect i18n translation', () => {
    const { getSignInText } = authenticatorTextUtil;
    expect(getSignInText()).toBe('Sign in');
    I18n.putVocabulariesForLanguage('en-us', { 'Sign in': 'Log in' });
    expect(getSignInText()).toBe('Log in');
  });

  it.each(SOCIAL_PROVIDERS)(
    'getSignInWithFederationText with %s in sign in route renders text as expected',
    (provider) => {
      const { getSignInWithFederationText } = authenticatorTextUtil;
      expect(getSignInWithFederationText('signIn', provider)).toMatchSnapshot();
    }
  );

  it.each(SOCIAL_PROVIDERS)(
    'getSignInWithFederationText with %s in sign up route returns the expected text',
    (provider) => {
      const { getSignInWithFederationText } = authenticatorTextUtil;
      expect(getSignInWithFederationText('signUp', provider)).toMatchSnapshot();
    }
  );

  it.each(CODE_DELIVERY_DETAILS)(
    'getDeliveryMethodText for %s returns the expected text',
    (deliveryMethod) => {
      const { getDeliveryMethodText } = authenticatorTextUtil;

      const codeDeliveryDetail = {
        DeliveryMedium: deliveryMethod,
      } as unknown as V5CodeDeliveryDetails;

      expect(getDeliveryMethodText(codeDeliveryDetail)).toMatchSnapshot();
    }
  );

  it.each(CODE_DELIVERY_DETAILS)(
    'getDeliveryMessageText for %s returns the expected text',
    (deliveryMethod) => {
      const { getDeliveryMessageText } = authenticatorTextUtil;

      const codeDeliveryDetail = {
        DeliveryMedium: deliveryMethod,
      } as unknown as V5CodeDeliveryDetails;

      expect(getDeliveryMessageText(codeDeliveryDetail)).toMatchSnapshot();
    }
  );

  it.each(AUTH_CHALLENGE_NAMES)(
    'getChallengeText for %s returns the expected text',
    (challengeName) => {
      const { getChallengeText } = authenticatorTextUtil;
      expect(getChallengeText(challengeName)).toMatchSnapshot();
    }
  );
});
