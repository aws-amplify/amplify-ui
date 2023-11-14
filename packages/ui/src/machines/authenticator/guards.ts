import {
  ConfirmSignUpOutput,
  FetchUserAttributesOutput,
  ResetPasswordOutput,
  SignInOutput,
  SignUpOutput,
} from 'aws-amplify/auth';

import { MachineOptions } from 'xstate';

import { AuthActorContext, AuthEvent } from './types';

const SIGN_IN_STEP_MFA_CONFIRMATION: string[] = [
  'CONFIRM_SIGN_IN_WITH_SMS_CODE',
  'CONFIRM_SIGN_IN_WITH_TOTP_CODE',
];

// reponse next step guards
const shouldConfirmSignIn = (_: AuthActorContext, event: AuthEvent): boolean =>
  SIGN_IN_STEP_MFA_CONFIRMATION.includes(event.data?.nextStep?.signInStep);

const shouldConfirmSignInWithNewPassword = (
  _: AuthActorContext,
  event: AuthEvent
): boolean =>
  (event.data as SignInOutput)?.nextStep.signInStep ===
  'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED';

const shouldResetPassword = (_: AuthActorContext, event: AuthEvent): boolean =>
  (event.data as SignInOutput)?.nextStep?.signInStep === 'RESET_PASSWORD';

const shouldConfirmSignUpFromSignIn = (
  _: AuthActorContext,
  { data }: AuthEvent
) => (data as SignInOutput)?.nextStep.signInStep === 'CONFIRM_SIGN_UP';

const shouldAutoSignIn = (_: AuthActorContext, { data }: AuthEvent) =>
  (data as SignUpOutput)?.nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN';

const hasCompletedSignIn = (_: AuthActorContext, { data }: AuthEvent) =>
  (data as SignInOutput)?.nextStep.signInStep === 'DONE';

const hasCompletedSignUp = (_: AuthActorContext, { data }: AuthEvent) =>
  (data as SignUpOutput)?.nextStep.signUpStep === 'DONE';

const hasCompletedResetPassword = (_: AuthActorContext, { data }: AuthEvent) =>
  (data as ResetPasswordOutput)?.nextStep.resetPasswordStep === 'DONE';

const shouldConfirmSignUp = (_: AuthActorContext, { data }: AuthEvent) =>
  (data as ConfirmSignUpOutput)?.nextStep.signUpStep === 'CONFIRM_SIGN_UP';

// actor entry guards
const isCompletedAttributeConfirmationStep = (
  _: AuthActorContext,
  { data }: AuthEvent
) => {
  return data.step === 'CONFIRM_ATTRIBUTE_COMPLETE';
};
const isForgotPasswordStep = ({ step }: AuthActorContext) =>
  step === 'FORGOT_PASSWORD';

const isConfirmUserAttributeStep = ({ step }: AuthActorContext) =>
  step === 'CONFIRM_ATTRIBUTE_WITH_CODE';

const isShouldConfirmUserAttributeStep = ({ step }: AuthActorContext) =>
  step === 'SHOULD_CONFIRM_USER_ATTRIBUTE';

// create force update password flow
const isResetPasswordStep = ({ step }: AuthActorContext) =>
  step === 'RESET_PASSWORD';

const isConfirmResetPasswordStep = ({ step }: AuthActorContext) =>
  step === 'CONFIRM_RESET_PASSWORD_WITH_CODE';

const isConfirmSignInStep = ({ step }: AuthActorContext) =>
  SIGN_IN_STEP_MFA_CONFIRMATION.includes(step);

const isConfirmSignUpStep = ({ step }: AuthActorContext) =>
  step === 'CONFIRM_SIGN_UP';

const isContinueSignInWthTotpSetupStep = ({ step }: AuthActorContext) =>
  step === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP';

// miscellaneous guards
const shouldVerifyAttribute = (
  _: AuthActorContext,
  { data }: AuthEvent
): boolean => {
  const { phone_number_verified, email_verified } =
    data as FetchUserAttributesOutput;

  // email/phone_verified is returned as a string
  const emailNotVerified =
    email_verified === undefined || email_verified === 'false';
  const phoneNotVerified =
    phone_number_verified === undefined || phone_number_verified === 'false';

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
const isUserAlreadyConfirmed = (_: AuthActorContext, { data }: AuthEvent) =>
  data.message === 'User is already confirmed.';

const GUARDS: MachineOptions<AuthActorContext, AuthEvent>['guards'] = {
  hasCompletedResetPassword,
  hasCompletedSignIn,
  hasCompletedSignUp,
  isCompletedAttributeConfirmationStep,
  isConfirmResetPasswordStep,
  isConfirmSignInStep,
  isConfirmSignUpStep,
  isConfirmUserAttributeStep,
  isContinueSignInWthTotpSetupStep,
  isForgotPasswordStep,
  isResetPasswordStep,
  isShouldConfirmUserAttributeStep,
  isUserAlreadyConfirmed,
  shouldAutoSignIn,
  shouldConfirmSignIn,
  shouldConfirmSignInWithNewPassword,
  shouldConfirmSignUp,
  shouldConfirmSignUpFromSignIn,
  shouldResetPassword,
  shouldVerifyAttribute,
};

export default GUARDS;
