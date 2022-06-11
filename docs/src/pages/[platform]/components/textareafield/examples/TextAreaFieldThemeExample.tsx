import { TextAreaField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'textAreaField-theme',
  tokens: {
    components: {
      // what are the subcomponents we need to style?
      text: {
        // TODO: customize here
      },
    },
  },
};

export const TextAreaFieldThemeExample = () => (
  <ThemeProvider theme={theme}>
    <TextAreaField
      label="Themed TextAreaField"
      placeholder="Theming..."
      descriptiveText="test test test"
    />
  </ThemeProvider>
);
