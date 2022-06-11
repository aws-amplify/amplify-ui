import { SwitchField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'switchfield-theme',
  tokens: {
    components: {
      switchfield: {
        // TODO: customize here
      },
      // is switch a subcomponent?
    },
  },
};

export const SwitchFieldThemeExample = () => (
  <ThemeProvider theme={theme}>
    <SwitchField label="Themed Switch" />
  </ThemeProvider>
);
