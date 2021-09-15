import { LoginMechanism, userNameAliasArray } from '@aws-amplify/ui';

export const useAliases = (
  login_mechanisms: LoginMechanism[]
): LoginMechanism[] => {
  if (login_mechanisms) {
    if (login_mechanisms.length === 1 && login_mechanisms[0] === 'username') {
      return [...userNameAliasArray];
    } else {
      return login_mechanisms;
    }
  } else {
    return [...userNameAliasArray];
  }
};
