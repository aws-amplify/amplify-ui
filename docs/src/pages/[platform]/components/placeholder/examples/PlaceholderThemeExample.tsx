import { Placeholder, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'placeholder-theme',
  tokens: {
    components: {
      placeholder: {
        transitionDuration: { value: '1250ms' },
        startColor: { value: '{colors.blue.40}' },
        endColor: { value: '{colors.blue.80}' },
        borderRadius: { value: '{radii.large}' },
        large: {
          height: { value: '{space.xxxl}' },
        },
      },
    },
  },
};

export const PlaceholderThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Placeholder size="large" />
    </ThemeProvider>
  );
};
