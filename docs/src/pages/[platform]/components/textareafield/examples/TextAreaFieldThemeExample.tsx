import { ThemeProvider, TextAreaField } from '@aws-amplify/ui-react';

const theme = {
  name: 'text-area-theme',
  tokens: {
    components: {
      textareafield: {
        color: { value: 'red' },
        _focus: {
          borderColor: { value: '{colors.brand.primary.40}' },
        },
      },
    },
  },
};

export const TextAreaFieldThemeExample = () => (
  <ThemeProvider theme={theme}>
    <TextAreaField label="Name" defaultValue="Starting Value" />
  </ThemeProvider>
);
