import {
  FetchUserAttributesOutput,
  ResendSignUpCodeOutput,
  ResetPasswordOutput,
  SendUserAttributeVerificationCodeOutput,
  SignInOutput,
  SignUpOutput,
} from 'aws-amplify/auth';

import { actions as xStateActions, MachineOptions } from 'xstate';
import { trimValues } from '../../helpers';

import {
  AuthEvent,
  AuthActorContext,
  ResetPasswordStep,
  SignInStep,
  SignUpStep,
  AuthTOTPSetupDetails,
  ChallengeName,
  CodeDeliveryDetails,
  V5CodeDeliveryDetails,
} from './types';
import { getUsernameSignUp, sanitizePhoneNumber } from './utils';

const { assign } = xStateActions;

const clearActorDoneData = assign({ actorDoneData: undefined });
const clearChallengeName = assign({ challengeName: undefined });
const clearMissingAttributes = assign({ missingAttributes: undefined });
const clearError = assign({ remoteError: undefined });
const clearFormValues = assign({ formValues: {} });
const clearTouched = assign({ touched: {} });
const clearUser = assign({ user: undefined });
const clearValidationError = assign({ validationError: {} });

/**
 * "set" actions
 */
const setTotpSecretCode = assign({
  totpSecretCode: (_, { data }: AuthEvent) => {
    const { sharedSecret } = (data.nextStep?.totpSetupDetails ??
      {}) as AuthTOTPSetupDetails;
    return sharedSecret;
  },
});

const setSignInStep = assign({ step: 'SIGN_IN' });

const setShouldVerifyUserAttributeStep = assign({
  step: 'SHOULD_CONFIRM_USER_ATTRIBUTE',
});

const setConfirmAttributeCompleteStep = assign({
  step: 'CONFIRM_ATTRIBUTE_COMPLETE',
});

// map v6 `signInStep` to v5 `challengeName`
const setChallengeName = assign({
  challengeName: (_, { data }: AuthEvent): ChallengeName | undefined => {
    const { signInStep } = (data as SignInOutput).nextStep;
    return signInStep === 'CONFIRM_SIGN_IN_WITH_SMS_CODE'
      ? 'SMS_MFA'
      : signInStep === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE'
      ? 'SOFTWARE_TOKEN_MFA'
      : signInStep === 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE'
      ? 'EMAIL_OTP'
      : undefined;
  },
});

const setUsernameForgotPassword = assign({
  username: ({ formValues, loginMechanisms }: AuthActorContext) => {
    const loginMechanism = loginMechanisms[0];
    const { username, country_code } = formValues;
    if (loginMechanism === 'phone_number') {
      // forgot password `formValues` uses `username` for base phone number value
      // prefix `country_code` for full `username`
      return sanitizePhoneNumber(country_code, username);
    }
    // default username field for loginMechanism === 'email' is "username" for SignIn
    return username;
  },
});

const setUsernameSignUp = assign({ username: getUsernameSignUp });

const setUsernameSignIn = assign({
  username: ({ formValues, loginMechanisms }: AuthActorContext) => {
    const loginMechanism = loginMechanisms[0];
    const { username, country_code } = formValues;

    if (loginMechanism === 'phone_number') {
      // sign in `formValues` uses `username` for base phone number value
      // prefix `country_code` for full `username`
      return sanitizePhoneNumber(country_code, username);
    }

    // return `email` and `username`
    return username;
  },
});

const setNextSignInStep = assign({
  step: (_, { data }: AuthEvent): SignInStep =>
    (data as SignInOutput).nextStep.signInStep === 'DONE'
      ? 'SIGN_IN_COMPLETE'
      : data.nextStep.signInStep,
});

const setNextSignUpStep = assign({
  step: (_, { data }: AuthEvent): SignUpStep =>
    (data as SignUpOutput).nextStep.signUpStep === 'DONE'
      ? 'SIGN_UP_COMPLETE'
      : data.nextStep.signUpStep,
});

const setNextResetPasswordStep = assign({
  step: (_, { data }: AuthEvent): ResetPasswordStep =>
    (data as ResetPasswordOutput).nextStep.resetPasswordStep === 'DONE'
      ? 'RESET_PASSWORD_COMPLETE'
      : data.nextStep.resetPasswordStep,
});

const setMissingAttributes = assign({
  missingAttributes: (_, { data }: AuthEvent) =>
    data.nextStep?.missingAttributes,
});

const setFieldErrors = assign({
  validationError: (_, { data }: AuthEvent) => data,
});

const setRemoteError = assign({
  remoteError: (_, { data }: AuthEvent) => {
    if (data.name === 'NoUserPoolError') {
      return `Configuration error (see console) – please contact the administrator`;
    }
    return data?.message || data;
  },
});

const setUser = assign({ user: (_, { data }: AuthEvent) => data });

const resolveCodeDeliveryDetails = (
  details: CodeDeliveryDetails
): V5CodeDeliveryDetails => ({
  Destination: details.destination,
  DeliveryMedium: details.deliveryMedium,
  AttributeName: details.attributName,
});

type OutputWithDetails =
  | ResetPasswordOutput
  | ResendSignUpCodeOutput
  | SendUserAttributeVerificationCodeOutput
  | SignUpOutput;
const setCodeDeliveryDetails = assign({
  codeDeliveryDetails: (_, { data }: { data: OutputWithDetails }) => {
    if (
      (data as { nextStep?: { codeDeliveryDetails?: CodeDeliveryDetails } })
        ?.nextStep?.codeDeliveryDetails
    ) {
      return resolveCodeDeliveryDetails(
        (data as { nextStep?: { codeDeliveryDetails?: CodeDeliveryDetails } })
          .nextStep.codeDeliveryDetails
      );
    }
    return resolveCodeDeliveryDetails(data as CodeDeliveryDetails);
  },
});

const handleInput = assign({
  formValues: (context, { data }: AuthEvent) => {
    const { name, value } = data;
    return { ...context['formValues'], [name]: value };
  },
});

const handleSubmit = assign({
  formValues: (context: AuthActorContext, { data }: AuthEvent) =>
    // do not trim password
    trimValues({ ...context['formValues'], ...data }, 'password'),
});

const handleBlur = assign({
  touched: (context: AuthActorContext, { data }: AuthEvent) => ({
    ...context['touched'],
    [data.name]: true,
  }),
});

const setUnverifiedUserAttributes = assign({
  unverifiedUserAttributes: (_, { data }: AuthEvent) => {
    const { email, phone_number } = data as FetchUserAttributesOutput;

    const unverifiedUserAttributes = {
      ...(email && { email }),
      ...(phone_number && { phone_number }),
    };

    return unverifiedUserAttributes;
  },
});

const clearSelectedUserAttribute = assign({ selectedUserAttribute: undefined });

const setSelectedUserAttribute = assign({
  selectedUserAttribute: (context: AuthActorContext) =>
    context.formValues?.unverifiedAttr,
});

// Maps to unexposed `ConfirmSignUpSignUpStep`
const setConfirmSignUpSignUpStep = assign({ step: 'CONFIRM_SIGN_UP' });

const ACTIONS: MachineOptions<AuthActorContext, AuthEvent>['actions'] = {
  clearActorDoneData,
  clearChallengeName,
  clearError,
  clearFormValues,
  clearMissingAttributes,
  clearSelectedUserAttribute,
  clearTouched,
  clearUser,
  clearValidationError,
  handleBlur,
  handleInput,
  handleSubmit,
  setChallengeName,
  setCodeDeliveryDetails,
  setFieldErrors,
  setMissingAttributes,
  setNextResetPasswordStep,
  setNextSignInStep,
  setNextSignUpStep,
  setRemoteError,
  setConfirmAttributeCompleteStep,
  setConfirmSignUpSignUpStep,
  setShouldVerifyUserAttributeStep,
  setSelectedUserAttribute,
  setSignInStep,
  setTotpSecretCode,
  setUser,
  setUnverifiedUserAttributes,
  setUsernameForgotPassword,
  setUsernameSignIn,
  setUsernameSignUp,
};

export default ACTIONS;
