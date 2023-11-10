import {
  FetchUserAttributesOutput,
  ResendSignUpCodeOutput,
  ResetPasswordOutput,
  SendUserAttributeVerificationCodeOutput,
  SignInOutput,
  SignUpOutput,
} from 'aws-amplify/auth';

import { actions as xStateActions, MachineOptions } from 'xstate';
import { DEFAULT_COUNTRY_CODE, trimValues } from '../../helpers';

import {
  AuthEvent,
  AuthActorContext,
  ResetPasswordStep,
  SignInStep,
  SignUpStep,
} from './types';

import {
  AuthTOTPSetupDetails,
  ChallengeName,
  CodeDeliveryDetails,
  V5CodeDeliveryDetails,
} from './types';
import { groupLog } from '../../utils';

const { assign } = xStateActions;

/**
 * https://github.com/statelyai/xstate/issues/866
 *
 * Actions in Xstate take in two arguments - a `context` and
 * an `event`.
 *
 * When writing reusable actions in a separate file for Xstate,
 * you cannot specify the type for both the `context` and the `event`.
 * The bug has been around for 2 years with seemingly no resolution
 * in sight.
 *
 * TypeScript apparently has trouble inferring Xstate properly.
 * So, when writing actions, only specify the type for either `context`
 * or `event` - but not both.
 *
 * https://xstate.js.org/docs/guides/typescript.html#assign-action-behaving-strangely
 *
 * Each of the actions NEEDS at least the `context` argument in the
 * `assign` body - even if it is unused. This is another known bug in
 * how TypeScript integrate with Xstate.
 */

/**
 * "clear" actions
 */
export const getUsernameValue = ({
  country_code,
  email,
  username,
}: AuthActorContext['formValues']) => {
  console.log('getUsernameValue');

  if (username) {
    console.log(
      '- username',
      country_code ? `${country_code}${username}` : username
    );
    return country_code ? `${country_code}${username}` : username;
  }

  console.log('- email', email);
  return email;
};

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
const clearUnverifiedContactMethods = assign({
  unverifiedContactMethods: (_) => undefined,
});
const clearUsername = assign({ username: (_) => undefined });
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

const setShouldVerifyUserAttribute = assign({
  step: 'SHOULD_VERIFY_USER_ATTRIBUTE',
});

const setConfirmAttributeComplete = assign({
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

const setUsername = assign({
  username: (context: AuthActorContext, _) => {
    groupLog('+++setUsername', context);
    return getUsernameValue(context.formValues);
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

/**
 * This action occurs on the entry to a state where a form submit action
 * occurs. It combines the phone_number and country_code form values, parses
 * the result, and updates the form values with the full phone number which is
 * the required format by Cognito for form submission.
 */
const parsePhoneNumber = assign({
  formValues: (context: AuthActorContext, _) => {
    const [primaryAlias = 'username'] = context.loginMechanisms;

    if (!context.formValues.phone_number && primaryAlias !== 'phone_number') {
      return context.formValues;
    }

    const { formValues } = context;
    const phoneAlias = formValues.phone_number ? 'phone_number' : 'username';

    const parsedPhoneNumber = `${
      formValues.country_code ?? DEFAULT_COUNTRY_CODE
    }${formValues[phoneAlias]}`.replace(/[^A-Z0-9+]/gi, '');

    const updatedFormValues = {
      ...formValues,
      [phoneAlias]: parsedPhoneNumber,
    };
    delete updatedFormValues.country_code;

    return updatedFormValues;
  },
});

const setUnverifiedUserAttributes = assign({
  unverifiedUserAttributes: (_, event: AuthEvent) => {
    groupLog('+++setUnverifiedUserAttributes', 'event', event);
    const { phone_number_verified, email_verified, email, phone_number } =
      event.data as FetchUserAttributesOutput;

    return {
      ...(email_verified === 'false' && email && { email }),
      ...(phone_number_verified === 'false' &&
        phone_number && { phone_number }),
    };
  },
});

const clearSelectedUserAttribute = assign({ selectedUserAttribute: undefined });

const setSelectedUserAttribute = assign({
  selectedUserAttribute: (context, event) => {
    groupLog('+++selectedUserAttribute', context, event);
    return 'idk';
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
  clearUnverifiedContactMethods,
  clearUsername,
  clearValidationError,
  handleBlur,
  handleInput,
  handleSubmit,
  parsePhoneNumber,
  setChallengeName,
  setCodeDeliveryDetails,
  setFieldErrors,
  setMissingAttributes,
  setNextResetPasswordStep,
  setNextSignInStep,
  setNextSignUpStep,
  setRemoteError,
  setSelectedUserAttribute,
  setTotpSecretCode,
  setShouldVerifyUserAttribute,
  setConfirmAttributeComplete,
  setConfirmSignUpSignUpStep,
  setUser,
  setUnverifiedUserAttributes,
  setUsername,
};

export default ACTIONS;
