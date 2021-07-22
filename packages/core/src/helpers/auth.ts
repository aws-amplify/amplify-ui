import { includes } from 'lodash';
import { AuthContext } from '..';
import { AuthInputAttributes, userNameAliasArray } from '../types';

export const socialProviderLoginMechanisms = ['amazon', 'google', 'facebook'];

export const authInputAttributes: AuthInputAttributes = {
  username: {
    label: 'Username',
    type: 'text',
    placeholder: '+1 (555) 555-1212',
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

/**
 * Given xstate context from AuthMachine, returns proper input type, label, and
 * associated error.
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
