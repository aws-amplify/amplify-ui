import { Heading, Flex, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'heading-theme',
  tokens: {
    components: {
      heading: {
        color: { value: '{colors.blue.80}' },

        1: {
          fontSize: { value: '{fontSizes.xxl.value}' },
          fontWeight: { value: '{fontWeights.bold.value}' },
        },
        6: {
          fontSize: { value: '{fontSizes.large.value}' },
          fontWeight: { value: '{fontWeights.normal.value}' },
        },
      },
    },
  },
};

export const HeadingThemeExample = () => (
  <ThemeProvider theme={theme}>
    <Flex direction="column">
      <Heading level={1}>Title</Heading>
      <Heading>Default</Heading>
    </Flex>
  </ThemeProvider>
);
