import { CheckboxField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'checkbox-theme',
  tokens: {
    components: {
      checkbox: {
        // TODO: customize here
      },
      checkboxfield: {
        // TODO: customize here
      },
    },
  },
};

export const CheckboxFieldThemeExample = () => (
  <ThemeProvider theme={theme}>
    <CheckboxField label="Subscribe" name="subscribe" value="yes" />
  </ThemeProvider>
);
