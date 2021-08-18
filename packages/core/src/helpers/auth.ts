import { includes } from 'lodash';
import { AuthContext } from '..';
import {
  AuthActorContext,
  AuthActorState,
  AuthInputAttributes,
  AuthMachineState,
  userNameAliasArray,
} from '../types';

export const authInputAttributes: AuthInputAttributes = {
  username: {
    label: 'Username',
    type: 'text',
    placeholder: 'Enter your username',
  },
  email: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  phone_number: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Enter your phone number',
  },
  confirmation_code: {
    label: 'Confirmation Code',
    placeholder: 'Enter your confirmation code',
    type: 'number',
  },
  password: {
    label: 'Password',
    placeholder: 'Enter your password',
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
 * and error attributes of the configured login_mechanisms.
 */
export const getAliasInfoFromContext = (context: AuthContext) => {
  const loginMechanisms = context.config?.login_mechanisms ?? ['username'];
  const error = context.actorRef?.context?.validationError['username'];

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
