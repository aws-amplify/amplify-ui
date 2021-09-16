import { LoginMechanism, userNameAliasArray } from '@aws-amplify/ui';

/**
 * If 'username' is the only login mechanism, then we ask for a user's
 * email and phone number during sign up as well.
 */
export const useAliases = (
  login_mechanisms: LoginMechanism[]
): LoginMechanism[] =>
  login_mechanisms?.length === 1 && login_mechanisms[0] === 'username'
    ? [...userNameAliasArray]
    : login_mechanisms;
