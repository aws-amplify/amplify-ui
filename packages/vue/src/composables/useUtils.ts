import { LoginMechanism, userNameAliasArray } from '@aws-amplify/ui';

export const useAliases = (
  login_mechanisms: LoginMechanism[]
): LoginMechanism[] =>
  login_mechanisms?.length > 1 && login_mechanisms[0] !== 'username'
    ? login_mechanisms
    : [...userNameAliasArray];
