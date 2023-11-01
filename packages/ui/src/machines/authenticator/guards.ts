import {
  ConfirmSignUpOutput,
  FetchUserAttributesOutput,
  ResetPasswordOutput,
  SignInOutput,
  SignUpOutput,
} from 'aws-amplify/auth';

import { MachineOptions } from 'xstate';

import { groupLog } from '../../utils';

import { AuthActorContext, AuthEvent } from './types';

const SIGN_IN_STEP_MFA_CONFIRMATION: string[] = [
  'CONFIRM_SIGN_IN_WITH_SMS_CODE',
  'CONFIRM_SIGN_IN_WITH_TOTP_CODE',
];

export const shouldConfirmSignIn = (_, event): boolean => {
  groupLog(
    '+++shouldConfirmSignIn',
    SIGN_IN_STEP_MFA_CONFIRMATION.includes(event.data?.nextStep?.signInStep)
  );
  return SIGN_IN_STEP_MFA_CONFIRMATION.includes(
    event.data?.nextStep?.signInStep
  );
};

export const shouldForceChangePassword = (_, event): boolean => {
  groupLog(
    '+++shouldForceChangePassword',
    event.data?.nextStep?.signInStep ===
      'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'
  );
  return (
    (event.data as SignInOutput)?.nextStep.signInStep ===
    'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'
  );
};

export const hasCompletedSignIn = (_, event): boolean => {
  groupLog('+++hasCompletedSignIn', event);
  return (event.data as SignInOutput)?.nextStep.signInStep === 'DONE';
};

export const shouldSetupTotp = (context, event): boolean => {
  groupLog(
    '+++shouldSetupTotp',
    event.data?.nextStep?.signInStep === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP',
    context,
    event
  );
  return (
    (event.data as SignInOutput)?.nextStep.signInStep ===
    'CONTINUE_SIGN_IN_WITH_TOTP_SETUP'
  );
};

export const shouldConfirmResetPassword = (_, event): boolean => {
  groupLog(
    '+++shouldConfirmResetPassword',
    event.data?.nextStep?.signInStep === 'RESET_PASSWORD'
  );
  return (
    (event.data as SignInOutput)?.nextStep?.signInStep === 'RESET_PASSWORD'
  );
};

export const shouldConfirmSignUpFromSignIn = (context, { data }: AuthEvent) => {
  groupLog(
    '+++shouldConfirmSignUpFromSignIn',
    (data as SignInOutput)?.nextStep.signInStep === 'CONFIRM_SIGN_UP',
    context,
    data
  );
  return (data as SignInOutput)?.nextStep.signInStep === 'CONFIRM_SIGN_UP';
};

export const shouldAutoSignIn = (context, { data }: AuthEvent) => {
  groupLog('+++shouldAutoSignIn', data);
  return (
    (data as SignUpOutput)?.nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN'
  );
};

export const hasCompletedSignUp = (_, event: AuthEvent) => {
  groupLog('+++hasCompletedSignUp', event);
  return (event.data as SignUpOutput)?.nextStep.signUpStep === 'DONE';
};

export const shouldConfirmSignUp = (context, { data }: AuthEvent) => {
  groupLog(
    '+++shouldConfirmSignUp',
    (data as ConfirmSignUpOutput)?.nextStep.signUpStep === 'CONFIRM_SIGN_UP',
    context,
    data
  );
  return (
    (data as ConfirmSignUpOutput)?.nextStep.signUpStep === 'CONFIRM_SIGN_UP'
  );
};

export const hasResetPassword = (_, event) => {
  return (
    (event.data as ResetPasswordOutput)?.nextStep.resetPasswordStep === 'DONE'
  );
};

export const shouldVerifyAttribute = (context, event): boolean => {
  const { phone_number_verified, email_verified } =
    event.data as FetchUserAttributesOutput;
  groupLog('+++shouldVerifyAttribute', event);

  // email/phone_verified is returned as a string
  const emailNotVerified =
    email_verified === undefined || email_verified === 'false';
  const phoneNotVerified =
    phone_number_verified === undefined || phone_number_verified === 'false';

  groupLog(
    '+++shouldVerifyAttribute evaluated:',
    emailNotVerified && phoneNotVerified
  );
  // only request verification if both email and phone are not verified
  return emailNotVerified && phoneNotVerified;
};

/**
 * This guard covers an edge case that exists in the current state of the UI.
 * As of now, our ConfirmSignUp screen only supports showing an input for a
 * confirmation code. However, a Cognito UserPool can instead verify users
 * through a link that gets emailed to them. If a user verifies through the
 * link and then they click on the "Resend Code" button, they will get an error
 * saying that the user has already been confirmed. If we encounter that error,
 * we want to just funnel them through the rest of the flow. In the future, we will
 * want to update our UI to support both confirmation codes and links.
 *
 * https://github.com/aws-amplify/amplify-ui/issues/219
 */
export const isUserAlreadyConfirmed = (context, event) => {
  console.log('+++isUserAlreadyConfirmed', event);
  return event.data.message === 'User is already confirmed.';
};

const GUARDS: MachineOptions<AuthActorContext, AuthEvent>['guards'] = {
  shouldConfirmSignIn,
  shouldForceChangePassword,
  hasCompletedSignIn,
  shouldSetupTotp,
  shouldConfirmResetPassword,
  shouldConfirmSignUpFromSignIn,
  shouldAutoSignIn,
  hasCompletedSignUp,
  shouldConfirmSignUp,
  hasResetPassword,
  shouldVerifyAttribute,
  isUserAlreadyConfirmed,
};

export default GUARDS;
