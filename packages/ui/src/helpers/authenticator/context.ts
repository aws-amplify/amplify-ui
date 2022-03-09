/**
 * This file contains helpers that process authenticator state machine context
 */
import includes from 'lodash/includes';

import { LoginMechanism, LoginMechanismArray, AuthContext } from '../../types';
import { authInputAttributes } from './form';

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
