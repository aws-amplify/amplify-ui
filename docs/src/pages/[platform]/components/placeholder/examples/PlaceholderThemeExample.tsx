import { Theme, Placeholder, ThemeProvider } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'placeholder-theme',
  tokens: {
    components: {
      placeholder: {
        transitionDuration: { value: '1250ms' },
        startColor: { value: '{colors.purple.40.value}' },
        endColor: { value: '{colors.purple.100.value}' },
        borderRadius: { value: '{radii.large.value}' },
        large: {
          height: { value: '{space.xxxl.value}' },
        },
      },
    },
  },
};

export const PlaceholderThemeExample = () => {
  return (
    <ThemeProvider theme={theme}>
      <Placeholder size="large" />
    </ThemeProvider>
  );
};
