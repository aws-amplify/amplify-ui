import { AmplifyProvider, PasswordField } from '@aws-amplify/ui-react';

const theme = {
  name: 'passwordfield-theme',
  tokens: {
    components: {
      fieldcontrol: {
        borderColor: {
          value: '{colors.purple.60}',
        },
        color: {
          value: '{colors.red.80}',
        },
      },
    },
  },
};

export const ThemeExample = () => {
  return (
    <AmplifyProvider theme={theme}>
      <PasswordField label="password" />
    </AmplifyProvider>
  );
};
