import { ThemeProvider, TextField } from '@aws-amplify/ui-react';

const theme = {
  name: 'text-theme',
  tokens: {
    components: {
      textfield: {
        color: { value: 'red' },
        _focus: {
          borderColor: { value: '{colors.brand.primary.40}' },
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
