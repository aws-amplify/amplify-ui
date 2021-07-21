import { includes } from 'lodash';
import { AuthContext } from '..';

export const socialProviderLoginMechanisms = ['amazon', 'google', 'facebook'];

export const UserNameAliasNames = {
  username: { name: 'Username', type: 'text' },
  email: { name: 'Email', type: 'email' },
  phone_number: { name: 'Phone Number', type: 'tel' },
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
    .filter((mechanism) => !includes(socialProviderLoginMechanisms, mechanism))
    .map(
      (v) => UserNameAliasNames[v]?.name ?? UserNameAliasNames['username'].name
    )
    .join(' or ');

  if (loginMechanisms.length === 1) {
    type = UserNameAliasNames[loginMechanisms[0]]?.type ?? 'text';
  }

  return { label, type, error };
};
