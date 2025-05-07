import type { ChallengeName, DisplayTextTemplate } from '@aws-amplify/ui';

import type { ComponentRoute } from '../ComponentRoute';

type GetChallengeText = (
  challengeName: ChallengeName | undefined
) => string | undefined;

type GetCopyButtonText = (hasCopied: boolean) => string;

type GetProviderButtonText = (provider: string) => string | undefined;

type GetPrimaryButtonText = (
  route: ComponentRoute | undefined
) => string | undefined;

type GetSecondaryButtonText = (
  route:
    | Extract<
        | 'confirmResetPassword'
        | 'confirmSignUp'
        | 'confirmVerifyUser'
        | 'verifyUser',
        ComponentRoute
      >
    | undefined
) => string | undefined;

type GetTitleText = (route: ComponentRoute) => string;

type GetSubHeadingText = (
  route: ComponentRoute | undefined
) => string | undefined;

type NavigationRoute = 'signIn' | 'signUp' | 'forgotPassword';
type GetSignInLinkText = (route: NavigationRoute) => string | undefined;

type GetResetPasswordLinkText = (route: NavigationRoute) => string | undefined;

type GetSignUpLinkText = (route: NavigationRoute) => string | undefined;

/**
 * Authenticator display text
 */
export type DisplayText = DisplayTextTemplate<{
  providersDividerText?: string;
  getChallengeText?: GetChallengeText;
  getCopyButtonText?: GetCopyButtonText;
  getDescriptionText?: GetSubHeadingText;
  getProviderButtonText?: GetProviderButtonText;
  getResetPasswordLinkText?: GetResetPasswordLinkText;
  getSignInLinkText?: GetSignInLinkText;
  getSignUpLinkText?: GetSignUpLinkText;
  getPrimaryButtonText?: GetPrimaryButtonText;
  getSecondaryButtonText?: GetSecondaryButtonText;
  getTitleText?: GetTitleText;
}>;

export type DisplayTextDefault = Required<DisplayText>;

export interface DisplayTextProviderProps {
  children?: React.ReactNode;
  displayText: DisplayTextDefault;
}
