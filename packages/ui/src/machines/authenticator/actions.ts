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
import { groupLog } from '../../utils';

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

const clearChallengeName = assign({
  challengeName: (_, e) => {
    groupLog('+++clearChallengeName', _, e);
    return undefined;
  },
});
const clearMissingAttributes = assign({
  missingAttributes: (_) => {
    groupLog('+++clearMissingAttributes');
    return undefined;
  },
});
const clearError = assign({ remoteError: (_) => '' });
const clearFormValues = assign({
  formValues: (_) => {
    groupLog('+++clearFormValues');
    return {};
  },
});
const clearTouched = assign({ touched: (_) => ({}) });

const clearValidationError = assign({ validationError: (_) => ({}) });

/**
 * "set" actions
 */
const setTotpSecretCode = assign({
  totpSecretCode: (ctx, event: AuthEvent) => {
    groupLog('+++setTotpSecretCode', ctx, event);
    const { sharedSecret } = (event.data.nextStep?.totpSetupDetails ??
      {}) as AuthTOTPSetupDetails;
    console.log('sharedSecret', sharedSecret);

    return sharedSecret;
  },
});

const setSignInStep = assign({
  step: 'SIGN_IN',
});

const setShouldVerifyUserAttributeStep = assign({
  step: 'SHOULD_VERIFY_USER_ATTRIBUTE',
});

const setConfirmAttributeCompleteStep = assign({
  step: 'CONFIRM_ATTRIBUTE_COMPLETE',
});

// map v6 `signInStep` to v5 `challengeName`
const setChallengeName = assign({
  challengeName: (_, event: AuthEvent): ChallengeName | undefined => {
    const { signInStep } = (event.data as SignInOutput).nextStep;
    const challengeName =
      signInStep === 'CONFIRM_SIGN_IN_WITH_SMS_CODE'
        ? 'SMS_MFA'
        : signInStep === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE'
        ? 'SOFTWARE_TOKEN_MFA'
        : undefined;
    groupLog(`+++setChallengeName: ${challengeName}`);
    return challengeName;
  },
});

const setUsernameResetPassword = assign({
  username: ({ formValues, loginMechanisms }: AuthActorContext) => {
    groupLog('++++ setUsernameResetPassword', formValues, loginMechanisms);
    const loginMechanism = loginMechanisms[0];
    const { username, country_code } = formValues;
    if (loginMechanism === 'phone_number') {
      // Forgot Password form is called `username`
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
    groupLog(`++++setUsernameSignIn`, formValues, loginMechanisms);
    const { username, country_code } = formValues;

    if (loginMechanism === 'phone_number') {
      return sanitizePhoneNumber(country_code, username);
    }

    // return `email` and `username`
    return username;
  },
});

const setNextSignInStep = assign({
  step: (_, event: AuthEvent): SignInStep => {
    groupLog(
      `+++setNextSignInStep: ${(event.data as SignInOutput)?.nextStep
        .signInStep}`
    );
    const nextStep =
      (event.data as SignInOutput).nextStep.signInStep === 'DONE'
        ? 'SIGN_IN_COMPLETE'
        : event.data.nextStep.signInStep;
    return nextStep;
  },
});

const setNextSignUpStep = assign({
  step: (_, event: AuthEvent): SignUpStep => {
    const nextStep =
      (event.data as SignUpOutput).nextStep.signUpStep === 'DONE'
        ? 'SIGN_UP_COMPLETE'
        : event.data.nextStep.signUpStep;
    groupLog(`+++setNextSignUpStep: ${nextStep}`);
    return nextStep;
  },
});

const setNextResetPasswordStep = assign({
  step: (_, event: AuthEvent): ResetPasswordStep => {
    const nextStep =
      (event.data as ResetPasswordOutput).nextStep.resetPasswordStep === 'DONE'
        ? 'RESET_PASSWORD_COMPLETE'
        : event.data.nextStep.resetPasswordStep;
    groupLog('+++setNextResetPasswordStep', nextStep);
    return nextStep;
  },
});

const setMissingAttributes = assign({
  missingAttributes: (_, event: AuthEvent) => {
    groupLog('+++setMissingAttributes', 'event', event);
    return event.data.nextStep?.missingAttributes;
  },
});

const setFieldErrors = assign({
  validationError: (_, event: AuthEvent) => event.data,
});

const setRemoteError = assign({
  remoteError: (_, event: AuthEvent) => {
    groupLog('+++setRemoteError', event.data.message);
    if (event.data.name === 'NoUserPoolError') {
      return `Configuration error (see console) – please contact the administrator`;
    }
    return event.data?.message || event.data;
  },
});

const setUser = assign({
  user: (_, event: AuthEvent) => {
    groupLog('+++setUser', event);
    return event.data;
  },
});

const resolveCodeDeliveryDetails = (
  details: CodeDeliveryDetails
): V5CodeDeliveryDetails => {
  console.log('details', details);

  return {
    Destination: details.destination,
    DeliveryMedium: details.deliveryMedium,
    AttributeName: details.attributName,
  };
};

const setCodeDeliveryDetails = assign({
  codeDeliveryDetails: (
    _,
    event: {
      data:
        | ResetPasswordOutput
        | ResendSignUpCodeOutput
        | SendUserAttributeVerificationCodeOutput
        | SignUpOutput;
    }
  ) => {
    groupLog('+++setCodeDeliveryDetails', event);

    if (
      (
        event.data as {
          nextStep?: { codeDeliveryDetails?: CodeDeliveryDetails };
        }
      )?.nextStep?.codeDeliveryDetails
    ) {
      return resolveCodeDeliveryDetails(
        (
          event.data as {
            nextStep?: { codeDeliveryDetails?: CodeDeliveryDetails };
          }
        ).nextStep.codeDeliveryDetails
      );
    }
    return resolveCodeDeliveryDetails(
      (event as { data: CodeDeliveryDetails }).data
    );
  },
});

const handleInput = assign({
  formValues: (context, event: AuthEvent) => {
    const { name, value } = event.data;
    return { ...context['formValues'], [name]: value };
  },
});

const handleSubmit = assign({
  formValues: (context, event: AuthEvent) => {
    const formValues = { ...context['formValues'], ...event.data };
    // do not trim password
    return trimValues(formValues, 'password');
  },
});

const handleBlur = assign({
  touched: (context, event: AuthEvent) => {
    const { name } = event.data;
    return {
      ...context['touched'],
      [`${name}`]: true,
    };
  },
});

const setUnverifiedUserAttributes = assign({
  unverifiedUserAttributes: (_, event: AuthEvent) => {
    groupLog('+++setUnverifiedUserAttributes', 'event', event);
    const { email, phone_number } = event.data as FetchUserAttributesOutput;

    const unverifiedUserAttributes = {
      ...(email && { email }),
      ...(phone_number && { phone_number }),
    };

    console.log('unverifiedUserAttributes', unverifiedUserAttributes);

    return unverifiedUserAttributes;
  },
});

const clearSelectedUserAttribute = assign({ selectedUserAttribute: undefined });

const setSelectedUserAttribute = assign({
  selectedUserAttribute: (context: any, event) => {
    groupLog('+++setSelectedUserAttribute', context, event);
    return context.formValues?.unverifiedAttr;
  },
});

// Maps to unexposed `ConfirmSignUpSignUpStep`
const setConfirmSignUpSignUpStep = assign({ step: 'CONFIRM_SIGN_UP' });

const ACTIONS: MachineOptions<AuthActorContext, AuthEvent>['actions'] = {
  clearChallengeName,
  clearError,
  clearFormValues,
  clearMissingAttributes,
  clearSelectedUserAttribute,
  clearTouched,
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
  setUsernameResetPassword,
  setUsernameSignIn,
  setUsernameSignUp,
};

export default ACTIONS;
