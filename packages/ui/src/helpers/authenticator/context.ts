/**
 * This file contains helpers that process authenticator state machine context
 */
import includes from 'lodash/includes';

import {
  LoginMechanismArray,
  AuthContext,
  AuthMachineState,
  ActorContextWithForms,
} from '../../types';
import { getActorContext } from './actor';

export const getPrimaryAlias = (state: AuthMachineState) => {
  const { primaryAlias } = getActorContext(state) as ActorContextWithForms;
  return primaryAlias;
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
