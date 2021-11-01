import { includes } from 'lodash';
import { Sender } from 'xstate';
import { AuthContext } from '..';
import {
  ActorContextWithForms,
  AuthActorContext,
  AuthActorState,
  AuthEvent,
  AuthEventData,
  AuthEventTypes,
  AuthInputAttributes,
  AuthMachineState,
  UserNameAlias,
  userNameAliasArray,
} from '../types';

export const authInputAttributes: AuthInputAttributes = {
  username: {
    label: 'Username',
    type: 'text',
    placeholder: 'Username',
  },
  email: {
    label: 'Email',
    type: 'email',
    placeholder: 'Email',
  },
  phone_number: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Phone',
  },
  confirmation_code: {
    label: 'Confirmation Code',
    placeholder: 'Code',
    type: 'number',
  },
  password: {
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
  },
};

export enum FederatedIdentityProviders {
  Amazon = 'LoginWithAmazon',
  Facebook = 'Facebook',
  Google = 'Google',
}

/**
 * Given xstate context from AuthMachine, this returns the input label, type,
 * and error attributes of the configured login_mechanisms. An optional "alias"
 * may be passed in to get info from context for that specific alias.
 */
export const getAliasInfoFromContext = (
  context: AuthContext,
  alias?: UserNameAlias
) => {
  const loginMechanisms = context.config?.login_mechanisms ?? ['username'];
  const error = context.actorRef?.context?.validationError['username'];

  if (userNameAliasArray.includes(alias)) {
    return {
      label: authInputAttributes[alias].label,
      type: authInputAttributes[alias].type,
      error,
    };
  }

  let type = 'text';
  const label = loginMechanisms
    .filter((mechanism) => includes(userNameAliasArray, mechanism))
    .map((v) => {
      return (
        authInputAttributes[v]?.label ?? authInputAttributes['username'].label
      );
    })
    .join(' or ');

  if (loginMechanisms.length === 1) {
    type = authInputAttributes[loginMechanisms[0]]?.type ?? 'text';
  }

  return { label, type, error };
};

/**
 * Given xstate context from AuthMachine, returns the primaryAlias and
 * secondaryAliases.
 */
export const getConfiguredAliases = (context: AuthContext) => {
  const login_mechanisms = context.config?.login_mechanisms ?? [
    ...userNameAliasArray,
  ];
  const aliases = login_mechanisms.filter((mechanism) =>
    includes(userNameAliasArray, mechanism)
  );

  const [primaryAlias, ...secondaryAliases] = aliases;
  return { primaryAlias, secondaryAliases };
};

/**
 * Get the state of current actor. This is useful for checking which screen
 * to render: e.g. `getActorState(state).matches('confirmSignUp.edit').
 */
export const getActorState = (state: AuthMachineState): AuthActorState => {
  return state.context.actorRef?.getSnapshot();
};

/**
 * Get the context of current actor. Useful for getting any nested context
 * like remoteError.
 */
export const getActorContext = (state: AuthMachineState): AuthActorContext => {
  return getActorState(state)?.context;
};

/**
 * Creates public facing auth helpers that abstracts out xstate implementation
 * detail. Each framework implementation can export these helpers so that
 * developers can send events without having to learn internals.
 *
 * ```
 * const [state, send] = useActor(...);
 * const { submit } = getSendEventAliases(send);
 * submit({ username, password})
 * ```
 */
export const getSendEventAliases = (send: Sender<AuthEvent>) => {
  const sendToMachine = (type: AuthEventTypes) => {
    // TODO If these were created during the creation of the machine & provider,
    // then invalid transitions could be caught via https://xstate.js.org/docs/guides/states.html#state-can-event
    return (data?: AuthEventData) => send({ type, data });
  };

  return {
    /** @deprecated use `updateForm` instead */
    change: sendToMachine('CHANGE'),
    updateForm: sendToMachine('CHANGE'),

    /** @deprecated use `resendCode` instead */
    resend: sendToMachine('RESEND'),
    resendCode: sendToMachine('RESEND'),

    signOut: sendToMachine('SIGN_OUT'),

    // Actions that don't immediately invoke a service but instead transition to a screen
    // are prefixed with `to*`

    /** @deprecated use `toFederatedSignIn` instead */
    federatedSignIn: sendToMachine('FEDERATED_SIGN_IN'),
    toFederatedSignIn: sendToMachine('FEDERATED_SIGN_IN'),

    /** @deprecated use `toResetPassword` instead */
    resetPassword: sendToMachine('RESET_PASSWORD'),
    toResetPassword: sendToMachine('RESET_PASSWORD'),

    /** @deprecated use `toSignIn` instead */
    signIn: sendToMachine('SIGN_IN'),
    toSignIn: sendToMachine('SIGN_IN'),

    /** @deprecated use `toSignUp` instead */
    signUp: sendToMachine('SIGN_UP'),
    toSignUp: sendToMachine('SIGN_UP'),

    /** @deprecated use `skipVerification` instead */
    skip: sendToMachine('SKIP'),
    skipVerification: sendToMachine('SKIP'),

    /** @deprecated Use `submitForm` instead */
    submit: sendToMachine('SUBMIT'),
    submitForm: sendToMachine('SUBMIT'),
  } as const;
};

export const getServiceFacade = ({ send, state }) => {
  const user = state.context?.user;
  const actorState = getActorState(state);
  const actorContext: ActorContextWithForms = getActorContext(state);
  const sendEventAliases = getSendEventAliases(send);
  const error = actorContext?.remoteError;
  const validationErrors = { ...actorContext?.validationError };
  const hasValidationErrors = Object.keys(validationErrors).length > 0;
  const isPending =
    state.hasTag('pending') || getActorState(state)?.hasTag('pending');

  const route = (() => {
    switch (true) {
      case state.matches('idle'):
        return 'idle';
      case state.matches('signOut'):
        return 'signOut';
      case state.matches('authenticated'):
        return 'authenticated';
      case actorState?.matches('confirmSignUp'):
        return 'confirmSignUp';
      case actorState?.matches('confirmSignIn'):
        return 'confirmSignIn';
      case actorState?.matches('setupTOTP'):
        return 'setupTOTP';
      case actorState?.matches('signIn'):
        return 'signIn';
      case actorState?.matches('signUp'):
        return 'signUp';
      case actorState?.matches('forceNewPassword'):
        return 'forceNewPassword';
      case actorState?.matches('resetPassword'):
        return 'resetPassword';
      case actorState?.matches('confirmResetPassword'):
        return 'confirmResetPassword';
      case actorState?.matches('verifyUser'):
        return 'verifyUser';
      case actorState?.matches('confirmVerifyUser'):
        return 'confirmVerifyUser';
      default:
        console.debug(
          'Cannot infer `route` from Authenticator state:',
          state.value
        );
        return null;
    }
  })();

  return {
    ...sendEventAliases,
    error,
    hasValidationErrors,
    isPending,
    route,
    user,
    validationErrors,
  };
};
