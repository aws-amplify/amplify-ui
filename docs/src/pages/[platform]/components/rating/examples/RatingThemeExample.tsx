import { Flex, Rating, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'rating-theme',
  tokens: {
    components: {
      rating: {
        filled: { color: { value: '{colors.yellow.60.value}' } },
        empty: { color: { value: '{colors.neutral.40.value}' } },
        small: { size: { value: '{fontSizes.xxs.value}' } },
        default: { size: { value: '{fontSizes.medium.value}' } },
        large: { size: { value: '{fontSizes.xl.value}' } },
      },
    },
  },
};

export const RatingThemeExample = () => (
  <ThemeProvider theme={theme}>
    <Flex direction="column">
      <Rating value={3} size="small" />
      <Rating value={3.5} />
      <Rating value={5} size="large" />
    </Flex>
  </ThemeProvider>
);
