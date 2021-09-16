import { includes } from 'lodash';
import { Sender } from 'xstate';
import { AuthContext } from '..';
import {
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
    placeholder: 'Enter your code',
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

  if (alias in userNameAliasArray) {
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
    return (data?: AuthEventData) => send({ type, data });
  };

  return {
    change: sendToMachine('CHANGE'),
    federatedSignIn: sendToMachine('FEDERATED_SIGN_IN'),
    resend: sendToMachine('RESEND'),
    resetPassword: sendToMachine('RESET_PASSWORD'),
    signIn: sendToMachine('SIGN_IN'),
    signOut: sendToMachine('SIGN_OUT'),
    signUp: sendToMachine('SIGN_UP'),
    skip: sendToMachine('SKIP'),
    submit: sendToMachine('SUBMIT'),
  } as const;
};
