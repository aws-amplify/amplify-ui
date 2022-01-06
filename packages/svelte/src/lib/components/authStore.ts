import {
  createAuthenticatorMachine,
  getServiceContextFacade,
  getSendEventAliases,
  translate,
} from '@aws-amplify/ui';
import { interpret } from 'xstate';

import { writable, get } from 'svelte/store';

let _facade = writable(null);
export const error = writable(null);
export const route = writable(null);
export const isPending = writable(null);
export const hasValidationErrors = writable(null);
export const user = writable(null);
export const validationErrors = writable(null);
export const codeDeliveryDetails = writable(null);
const _sendEventAliases = writable<ReturnType<typeof getSendEventAliases>>(
  null
);
/** @deprecated For internal use only */
export const authState = writable(null);

export function setupMachine(
  initialState,
  loginMechanisms,
  services,
  signUpAttributes,
  socialProviders
) {
  const machine = createAuthenticatorMachine({
    initialState,
    loginMechanisms,
    services,
    signUpAttributes,
    socialProviders,
  });

  const authService = interpret(machine, {
    devTools: process.env.NODE_ENV === 'development',
  }).start();

  const subscription = authService.subscribe((state) => {
    authState.update(() => state);
    _facade.update(() => getServiceContextFacade(state));
    setError();
    setRoute();
    setHasValidationErrors();
    setCodeDeliveryDetails();
    setIsPending();
    setUser();
    setValidationErrors();
  });

  _sendEventAliases.set(getSendEventAliases(authService.send));
  const _authService = authService;
  return subscription;
}

/**
 * Context facades
 */

function setError() {
  error.set(translate(get(_facade).error));
}

function setRoute() {
  route.set(get(_facade).route);
}

function setHasValidationErrors() {
  hasValidationErrors.set(get(_facade).hasValidationErrors);
}

function setIsPending() {
  isPending.set(get(_facade).isPending);
}

function setUser() {
  user.set(get(_facade).user);
}

function setValidationErrors() {
  validationErrors.set(get(_facade).validationErrors);
}

function setCodeDeliveryDetails() {
  codeDeliveryDetails.set(get(_facade).codeDeliveryDetails);
}

// /**
//  * Service facades
//  */

export function updateForm(...args) {
  return get(_sendEventAliases).updateForm(...args);
}

export function updateBlur(...args) {
  return get(_sendEventAliases).updateBlur(...args);
}

export function resendCode(...args) {
  return get(_sendEventAliases).resendCode(...args);
}

export function signOut(...args) {
  return get(_sendEventAliases).signOut(...args);
}

export function submitForm(...args) {
  return get(_sendEventAliases).submitForm(...args);
}

// /**
//  * Transition facades
//  */

export function toFederatedSignIn(...args) {
  return get(_sendEventAliases).toFederatedSignIn(...args);
}

export function toResetPassword(...args) {
  return get(_sendEventAliases).toResetPassword(...args);
}

export function toSignIn(...args) {
  return get(_sendEventAliases).toSignIn(...args);
}

export function toSignUp(...args) {
  return get(_sendEventAliases).toSignUp(...args);
}

export function skipVerification(...args) {
  return get(_sendEventAliases).skipVerification(...args);
}
