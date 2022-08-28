import { TextAreaField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'textareafield-theme',
  tokens: {
    components: {
      textareafield: {
        color: { value: '{colors.blue.90}' },
        _focus: {
          borderColor: { value: '{colors.blue.40}' },
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
