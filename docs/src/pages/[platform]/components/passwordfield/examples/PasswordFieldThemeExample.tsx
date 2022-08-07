import { PasswordField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'passwordfield-theme',
  tokens: {
    components: {
      passwordfield: {
        button: {
          color: { value: 'red' },
          _hover: {
            backgroundColor: { value: '{colors.blue.60}' },
            color: { value: 'white' },
          },
          _active: {
            backgroundColor: { value: '{colors.green.60}' },
            color: { value: 'white' },
          },
          _focus: {
            color: { value: 'white' },
          },
        },
      },
      fieldcontrol: {
        borderColor: {
          value: '{colors.blue.60}',
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
    <ThemeProvider theme={theme} colorMode="light">
      <PasswordField label="Password" />
    </ThemeProvider>
  );
};
