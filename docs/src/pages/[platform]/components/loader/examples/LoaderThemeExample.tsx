import { Loader, Flex, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'loader-theme',
  tokens: {
    components: {
      loader: {
        // TODO: customize here
      },
    },
  },
};

export const LoaderThemeExample = () => (
  <ThemeProvider theme={theme}>
    <Flex direction="column">
      <Loader />
      <Loader variation="linear" />
    </Flex>
  </ThemeProvider>
);

/*

  width: { value: '{fontSizes.medium.value}' },
  height: { value: '{fontSizes.medium.value}' },
  fontSize: { value: '{fontSizes.xs.value}' },
  strokeEmpty: { value: '{colors.neutral.20.value}' },
  strokeFilled: { value: '{colors.brand.primary.80.value}' },
  strokeLinecap: { value: 'round' },
  animationDuration: { value: '1s' },
  small: {
    width: { value: '{fontSizes.small.value}' },
    height: { value: '{fontSizes.small.value}' },
    fontSize: { value: '{fontSizes.xxs.value}' },
  },
  large: {
    width: { value: '{fontSizes.large.value}' },
    height: { value: '{fontSizes.large.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
  },
  linear: {
    width: { value: '100%' },
    minWidth: { value: '5rem' },
    fontSize: { value: '{fontSizes.medium.value}' },
    strokeWidth: { value: '{fontSizes.medium.value}' },
    strokeFilled: { value: '{colors.brand.primary.80.value}' },
    strokeEmpty: { value: '{colors.neutral.20.value}' },
    strokeLinecap: { value: 'round' },
    animationDuration: { value: '1s' },
    small: {
      strokeWidth: { value: '{fontSizes.small.value}' },
      fontSize: { value: '{fontSizes.small.value}' },
    },
    large: {
      strokeWidth: { value: '{fontSizes.large.value}' },
      fontSize: { value: '{fontSizes.large.value}' },
    },
  },
  text: {
    fill: { value: '{colors.font.primary.value}' },
  },

*/
