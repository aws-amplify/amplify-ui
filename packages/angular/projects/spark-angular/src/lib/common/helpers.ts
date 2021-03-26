import { AttributeInfoProvider } from './auth-types';

export const getAttributeMap: AttributeInfoProvider = () => ({
  // TODO: Replace this with I18n translations
  username: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
  password: {
    label: 'Password',
    placeholder: 'Enter your password',
  },
});
