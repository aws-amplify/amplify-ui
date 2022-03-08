/**
 * This file contains helpers that process authenticator state machine context
 */
import includes from 'lodash/includes';

import {
  LoginMechanism,
  LoginMechanismArray,
  AuthContext,
  AuthMachineState,
} from '../../types';
import { defaultFormFieldOptions } from './constants';

export const getPrimaryAlias = (state: AuthMachineState) => {
  const loginMechanisms = state?.context.config?.loginMechanisms;
  const [primaryAlias] = loginMechanisms ?? ['username'];
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
