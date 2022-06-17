import { TextAreaField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'textareafield-theme',
  tokens: {
    components: {
      textareafield: {
        color: { value: '{colors.brand.secondary.60}' },
        _focus: {
          borderColor: { value: 'red' },
        },
      },
    },
  },
};

export const TextAreaFieldThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <TextAreaField label="Name" defaultValue="Default Value" />
  </ThemeProvider>
);
