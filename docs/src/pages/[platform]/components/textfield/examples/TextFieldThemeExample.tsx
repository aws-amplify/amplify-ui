import { TextField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'textfield-theme',
  tokens: {
    components: {
      textfield: {
        color: { value: '{colors.blue.90}' },
        _focus: {
          borderColor: { value: '{colors.blue.40}' },
        },
      },
    },
  },
};

export const TextFieldThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <TextField label="Name" />
  </ThemeProvider>
);
