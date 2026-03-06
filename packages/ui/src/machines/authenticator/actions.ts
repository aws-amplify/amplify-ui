import type {
  FetchUserAttributesOutput,
  ResendSignUpCodeOutput,
  ResetPasswordOutput,
  SendUserAttributeVerificationCodeOutput,
  SignInOutput,
  SignUpOutput,
} from 'aws-amplify/auth';

import type { MachineOptions } from 'xstate';
import { actions as xStateActions } from 'xstate';
import { trimValues } from '../../helpers';
import { DefaultTexts, translate } from '../../i18n/translations';

import type {
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
const clearFormValues = assign({
  formValues: (context: AuthActorContext) => ({
    // Preserve username for passwordless flows to avoid "username is required" errors
    username: context.formValues?.username,
  }),
});
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

const setAllowedMfaTypes = assign({
  allowedMfaTypes: (_, { data }: AuthEvent) => {
    return data.nextStep?.allowedMFATypes;
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

    switch (signInStep) {
      case 'CONFIRM_SIGN_IN_WITH_SMS_CODE':
        return 'SMS_MFA';
      case 'CONFIRM_SIGN_IN_WITH_TOTP_CODE':
        return 'SOFTWARE_TOKEN_MFA';
      case 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE':
        return 'EMAIL_OTP';
      case 'CONTINUE_SIGN_IN_WITH_MFA_SETUP_SELECTION':
      case 'CONTINUE_SIGN_IN_WITH_EMAIL_SETUP':
      case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP':
        return 'MFA_SETUP';
      case 'CONTINUE_SIGN_IN_WITH_MFA_SELECTION':
        return 'SELECT_MFA_TYPE';
      default:
        return undefined;
    }
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

    const message = data?.message || '';

    // Handle USER_AUTH flow not enabled error
    if (message.includes('USER_AUTH flow not enabled')) {
      return translate(DefaultTexts.PASSWORDLESS_NOT_ENABLED);
    }

    // Handle cannot send code error
    if (message.includes('Cannot send code to either')) {
      return translate(DefaultTexts.CODE_DELIVERY_FAILED);
    }

    // Handle invalid/wrong verification code
    if (message.includes('Invalid code or auth state')) {
      return translate(DefaultTexts.VERIFICATION_CODE_INVALID);
    }

    // Handle expired verification code
    if (message.includes('session is expired')) {
      return translate(DefaultTexts.VERIFICATION_CODE_EXPIRED);
    }

    // Handle passkey authentication canceled
    if (message.includes('ceremony has been canceled')) {
      return translate(DefaultTexts.PASSKEY_AUTHENTICATION_CANCELED);
    }

    return message || data;
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
  | SignUpOutput
  | SignInOutput;
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
  unverifiedUserAttributes: (
    context: AuthActorContext,
    { data }: AuthEvent
  ) => {
    // Use fetchedUserAttributes from context if data is not provided
    const attributes = data || context.fetchedUserAttributes;
    if (!attributes) return {};

    const { email, phone_number } = attributes as FetchUserAttributesOutput;

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

// Passwordless actions
const setSelectedAuthMethod = assign({
  selectedAuthMethod: (_, { data }: AuthEvent) => data.method,
});

const setSelectedAuthMethodFromForm = assign({
  selectedAuthMethod: (_, { data }: AuthEvent) => {
    // Extract method from form data if present, default to PASSWORD for form submissions
    return data?.__authMethod || 'PASSWORD';
  },
});

const setSelectAuthMethodStep = assign({
  step: 'SELECT_AUTH_METHOD',
});

const setFetchedUserAttributes = assign({
  fetchedUserAttributes: (_, event: any) => event.data,
});

const setHasExistingPasskeys = assign({
  hasExistingPasskeys: (_, event: any) => event.data,
});

const clearHasExistingPasskeys = assign({
  hasExistingPasskeys: false,
});

const ACTIONS: MachineOptions<AuthActorContext, AuthEvent>['actions'] = {
  clearActorDoneData,
  clearChallengeName,
  clearError,
  clearFormValues,
  clearHasExistingPasskeys,
  clearMissingAttributes,
  clearSelectedUserAttribute,
  clearTouched,
  clearUser,
  clearValidationError,
  handleBlur,
  handleInput,
  handleSubmit,
  setAllowedMfaTypes,
  setChallengeName,
  setCodeDeliveryDetails,
  setFetchedUserAttributes,
  setFieldErrors,
  setHasExistingPasskeys,
  setMissingAttributes,
  setNextResetPasswordStep,
  setNextSignInStep,
  setNextSignUpStep,
  setRemoteError,
  setConfirmAttributeCompleteStep,
  setConfirmSignUpSignUpStep,
  setSelectAuthMethodStep,
  setSelectedAuthMethod,
  setSelectedAuthMethodFromForm,
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
