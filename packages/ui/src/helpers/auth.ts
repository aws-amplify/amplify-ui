import includes from 'lodash/includes';
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
  LoginMechanism,
  LoginMechanismArray,
} from '../types';

export const authInputAttributes: AuthInputAttributes = {
  birthdate: {
    label: 'Birthdate',
    placeholder: 'Birthdate',
    type: 'date',
    autocomplete: 'bday',
  },
  confirmation_code: {
    label: 'Confirmation Code',
    placeholder: 'Code',
    type: 'text',
    autocomplete: 'one-time-code',
  },
  email: {
    label: 'Email',
    type: 'email',
    placeholder: 'Email',
    autocomplete: 'username',
  },
  family_name: {
    label: 'Family Name',
    placeholder: 'Family Name',
    type: 'text',
    autocomplete: 'family-name',
  },
  given_name: {
    label: 'Given Name',
    placeholder: 'Given Name',
    type: 'text',
    autocomplete: 'given-name',
  },
  middle_name: {
    label: 'Middle Name',
    placeholder: 'Middle Name',
    type: 'text',
    autocomplete: 'additional-name',
  },
  name: {
    label: 'Name',
    placeholder: 'Name',
    type: 'text',
    autocomplete: 'name',
  },
  nickname: {
    label: 'Nickname',
    placeholder: 'Nickname',
    type: 'text',
    autocomplete: 'tel',
  },
  password: {
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    autocomplete: 'password',
  },
  phone_number: {
    label: 'Phone Number',
    placeholder: 'Phone',
    type: 'tel',
    autocomplete: 'tel',
  },
  preferred_username: {
    label: 'Preferred Username',
    placeholder: 'Preferred Username',
    type: 'text',
  },
  profile: {
    label: 'Profile',
    placeholder: 'Profile',
    type: 'url',
    autocomplete: 'url',
  },
  website: {
    label: 'Website',
    placeholder: 'Website',
    type: 'url',
    autocomplete: 'url',
  },
  username: {
    label: 'Username',
    type: 'text',
    placeholder: 'Username',
    autocomplete: 'username',
  },
};

export enum FederatedIdentityProviders {
  Apple = 'SignInWithApple',
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
  // TODO This function & its signature should be renamed since aliases were rolled back
  alias?: LoginMechanism
) => {
  const loginMechanisms = context.config?.loginMechanisms;
  const error = context.actorRef?.context?.validationError['username'];

  if (LoginMechanismArray.includes(alias)) {
    return {
      label: authInputAttributes[alias].label,
      type: authInputAttributes[alias].type,
      error,
    };
  }

  let type = 'text';
  const label = loginMechanisms
    .filter((mechanism) => includes(LoginMechanismArray, mechanism))
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
  const loginMechanisms = context.config?.loginMechanisms;
  const aliases = loginMechanisms.filter((mechanism) =>
    includes(LoginMechanismArray, mechanism)
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
    resendCode: sendToMachine('RESEND'),
    signOut: sendToMachine('SIGN_OUT'),
    submitForm: sendToMachine('SUBMIT'),
    updateForm: sendToMachine('CHANGE'),
    updateBlur: sendToMachine('BLUR'),

    // Actions that don't immediately invoke a service but instead transition to a screen
    // are prefixed with `to*`

    toFederatedSignIn: sendToMachine('FEDERATED_SIGN_IN'),
    toResetPassword: sendToMachine('RESET_PASSWORD'),
    toSignIn: sendToMachine('SIGN_IN'),
    toSignUp: sendToMachine('SIGN_UP'),
    skipVerification: sendToMachine('SKIP'),
  } as const;
};

export const getServiceContextFacade = (state: AuthMachineState) => {
  const user = state.context?.user;
  const actorState = getActorState(state);
  const actorContext = getActorContext(state) as ActorContextWithForms;
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
    error,
    hasValidationErrors,
    isPending,
    route,
    user,
    validationErrors,
  };
};

export const getServiceFacade = ({ send, state }) => {
  const sendEventAliases = getSendEventAliases(send);
  const serviceContext = getServiceContextFacade(state);

  return {
    ...sendEventAliases,
    ...serviceContext,
  };
};
