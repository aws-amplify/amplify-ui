import { capitalize, isString } from '@aws-amplify/ui';

import { isRoute } from '../../ComponentRoute';
import type { DisplayTextDefault } from '../types';

/**
 * Default display text properties
 */
export const displayTextEn: DisplayTextDefault = {
  providersDividerText: 'Or',
  getChallengeText: (challengeName) => `${challengeName}`,
  getCopyButtonText: (hasCopied) => (hasCopied ? 'Copied!' : 'Copy Code'),
  getDescriptionText: (route) => `${route} Description`,
  getProviderButtonText: (provider): string => `Sign In with ${provider}`,
  getResetPasswordLinkText: () => 'Reset Password',
  getSecondaryButtonText: (route) =>
    isRoute(route, 'confirmVerifyUser')
      ? `${route} Secondary Button`
      : isRoute(route, 'verifyUser')
      ? 'Skip'
      : undefined,
  getSignInLinkText: () => 'Back to Sign In',
  getSignUpLinkText: () => 'Create Account',
  getPrimaryButtonText: (route) =>
    isString(route) ? `${capitalize(route)} Submit Button` : undefined,
  getTitleText: (route) => `${capitalize(route)} Title`,
};
