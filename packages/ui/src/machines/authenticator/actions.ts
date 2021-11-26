import { assign, stop } from 'xstate/lib/actions';

import {
  ActorContextWithForms,
  AuthEvent,
  SignInContext,
  SignUpContext,
} from '../../types';

export const stopActor = (machineId: string) => {
  return stop(machineId);
};

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
export const clearAttributeToVerify = assign({
  attributeToVerify: (_) => undefined,
});
export const clearChallengeName = assign({ challengeName: (_) => undefined });
export const clearError = assign({ remoteError: (_) => '' });
export const clearFormValues = assign({ formValues: (_) => ({}) });
export const clearTouched = assign({ touched: (_) => ({}) });
export const clearUnverifiedAttributes = assign({
  unverifiedAttributes: (_) => undefined,
});
export const clearUsername = assign({ username: (_) => undefined });
export const clearValidationError = assign({ validationError: (_) => ({}) });

/**
 * "set" actions
 */
export const setChallengeName = assign({
  challengeName: (_, event: AuthEvent) => event.data?.challengeName,
});

export const setConfirmResetPasswordIntent = assign({
  redirectIntent: (_) => 'confirmPasswordReset',
});

export const setConfirmSignUpIntent = assign({
  redirectIntent: (_) => 'confirmSignUp',
});

export const setCredentials = assign({
  authAttributes: (context: SignInContext | SignUpContext, _) => {
    const [primaryAlias] = context.loginMechanisms;
    const username =
      context.formValues[primaryAlias] ?? context.formValues['username'];
    const password = context.formValues?.password;

    return { username, password };
  },
});

export const setFieldErrors = assign({
  validationError: (_, event: AuthEvent) => event.data,
});

export const setRemoteError = assign({
  remoteError: (_, event: AuthEvent) => event.data?.message || event.data,
});

export const setUnverifiedAttributes = assign({
  unverifiedAttributes: (_, event: AuthEvent) => event.data.unverified,
});

export const setUser = assign({
  user: (_, event: AuthEvent) => event.data.user || event.data,
});

export const setUsername = assign({
  username: (context: ActorContextWithForms, _) => context.formValues.username,
});

export const setUsernameAuthAttributes = assign({
  authAttributes: (context: ActorContextWithForms, _) => ({
    username: context.formValues.username,
  }),
});

export const handleInput = assign({
  formValues: (context, event: AuthEvent) => {
    const { name, value } = event.data;

    return {
      ...context['formValues'],
      [name]: value,
    };
  },
});

export const handleBlur = assign({
  touched: (context, event: AuthEvent) => {
    const { name } = event.data;
    return {
      ...context['touched'],
      [`${name}`]: true,
    };
  },
});
