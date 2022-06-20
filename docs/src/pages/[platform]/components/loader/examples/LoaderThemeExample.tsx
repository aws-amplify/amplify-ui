import { Loader, Flex, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'loader-theme',
  tokens: {
    components: {
      loader: {
        strokeEmpty: { value: '{colors.neutral.20}' },
        strokeFilled: { value: '{colors.green.80}' },

        // sizes
        large: {
          width: { value: '{fontSizes.xxxl}' },
          height: { value: '{fontSizes.xxxl}' },
        },

        // linear loader
        linear: {
          width: { value: '50%' },
          strokeWidth: { value: '{fontSizes.xxs}' },
          strokeFilled: { value: '{colors.brand.secondary.80}' },
          strokeEmpty: { value: '{colors.neutral.20}' },
          animationDuration: { value: '2s' },
        },
      },
    },
  },
};

export const LoaderThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Flex direction="column">
      <Loader size="large" />
      <Loader variation="linear" />
    </Flex>
  </ThemeProvider>
);
