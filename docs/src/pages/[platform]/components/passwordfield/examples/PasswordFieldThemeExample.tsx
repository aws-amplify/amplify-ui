import { ThemeProvider, PasswordField } from '@aws-amplify/ui-react';

const theme = {
  name: 'passwordfield-theme',
  tokens: {
    components: {
      // extend example
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

export const PasswordFieldThemeExample = () => {
  return (
    <ThemeProvider theme={theme}>
      <PasswordField label="password" />
    </ThemeProvider>
  );
};
