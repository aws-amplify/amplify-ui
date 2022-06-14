import { Rating, Flex, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'rating-theme',
  tokens: {
    components: {
      rating: {
        filled: { color: { value: '{colors.yellow.60}' } },
        empty: { color: { value: '{colors.neutral.40}' } },
        small: { size: { value: '{fontSizes.xxs}' } },
        default: { size: { value: '{fontSizes.medium}' } },
        large: { size: { value: '{fontSizes.xl}' } },
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
