export const useAliases = (login_mechanisms: string[]): string[] => {
  const defaultMechanisms = ['username', 'email', 'phone_number'];

  if (login_mechanisms) {
    if (login_mechanisms.length === 1 && login_mechanisms[0] === 'username') {
      return defaultMechanisms;
    } else {
      return login_mechanisms;
    }
  } else {
    return defaultMechanisms;
  }
};
