import { includes } from 'lodash';
import { AuthContext } from '..';
import { AuthInputAttributes, userNameAliasArray } from '../types';

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
  code: {
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
  const error = context.validationError['username'];

  let type = 'text';
  const label = loginMechanisms
    .filter((mechanism) => includes(userNameAliasArray, mechanism))
    .map(
      (v) =>
        authInputAttributes[v]?.label ?? authInputAttributes['username'].label
    )
    .join(' or ');

  if (loginMechanisms.length === 1) {
    type = authInputAttributes[loginMechanisms[0]]?.type ?? 'text';
  }

  return { label, type, error };
};
