import { TextField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'textfield-theme',
  tokens: {
    components: {
      // what are the subcomponents we need to style?
      text: {
        // TODO: customize here
      },
    },
  },
};

export const TextFieldThemeExample = () => (
  <ThemeProvider theme={theme}>
    <TextField
      label="Themed TextField"
      placeholder="Theming..."
      descriptiveText="test test test"
    />
  </ThemeProvider>
);
