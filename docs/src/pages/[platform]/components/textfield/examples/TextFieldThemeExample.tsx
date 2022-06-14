import { TextField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'textfield-theme',
  tokens: {
    components: {
      textfield: {
        color: { value: '{colors.brand.secondary.60}' },
        _focus: {
          borderColor: { value: 'red' },
        },
      },
    },
  },
};

export const TextFieldThemeExample = () => (
  <ThemeProvider theme={theme}>
    <TextField label="Name" />
  </ThemeProvider>
);
