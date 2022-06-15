import { ThemeProvider, PasswordField } from '@aws-amplify/ui-react';

const theme = {
  name: 'passwordfield-theme',
  tokens: {
    components: {
      passwordfield: {
        button: {
          color: { value: 'red' },
          _hover: {
            backgroundColor: { value: '{colors.neutral.60}' },
          },
          _active: {
            backgroundColor: { value: '{colors.neutral.80}' },
          },
          _focus: {
            backgroundColor: { value: '{colors.neutral.60}' },
          },
        },
      },
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
    <ThemeProvider theme={theme}>
      <PasswordField label="password" />
    </ThemeProvider>
  );
};
