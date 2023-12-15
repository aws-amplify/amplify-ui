import {
  PasswordField,
  ThemeProvider,
  Theme,
  Button,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'passwordfield-theme',
  tokens: {
    components: {
      button: {
        primary: {
          error: {
            backgroundColor: { value: 'orange' },
            _focus: { backgroundColor: { value: 'orange' } },
            _hover: { backgroundColor: { value: 'blue' } },
            _active: { backgroundColor: { value: 'yellow' } },
          },
        },
      },
      passwordfield: {
        button: {
          _error: {
            backgroundColor: { value: 'orange' },
            _focus: { backgroundColor: { value: 'orange' } },
            _hover: { backgroundColor: { value: 'blue' } },
            _active: { backgroundColor: { value: 'yellow' } },
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
      <PasswordField hasError={true} label="Password" />
      <Button variation="primary" colorTheme="error"></Button>
    </ThemeProvider>
  );
};
