export const useNameAlias = (alias: string): string => {
  switch (alias) {
    case 'username':
      return 'Username';
    case 'email':
      return 'Email';
    case 'phone_number':
      return 'Phone Number';
    default:
      return 'Username';
  }
};
