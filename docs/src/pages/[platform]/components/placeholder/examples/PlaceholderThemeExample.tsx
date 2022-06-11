import { Theme, Placeholder, ThemeProvider } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'placeholder-theme',
  tokens: {
    components: {
      placeholder: {
        startColor: { value: 'rebeccapurple' },
        endColor: { value: 'cyan' },
      },
    },
  },
};

export const PlaceholderThemeExample = () => {
  return (
    <ThemeProvider theme={theme} isNested>
      <Placeholder />
    </ThemeProvider>
  );
};
