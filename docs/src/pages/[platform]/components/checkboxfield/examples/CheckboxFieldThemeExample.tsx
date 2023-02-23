import { CheckboxField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'checkbox-theme',
  tokens: {
    components: {
      checkbox: {
        // @ts-ignore
        button: {
          color: { value: '{colors.yellow.40}' },
          _focus: {
            outlineColor: { value: '{colors.blue.40}' },
            borderColor: { value: '{colors.red.40}' },
          },
        },
        icon: {
          backgroundColor: { value: '{colors.brand.secondary.80}' },
        },
      },
    },
  },
};

export const CheckboxFieldThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <CheckboxField label="Subscribe" name="subscribe" value="yes" />
  </ThemeProvider>
);
