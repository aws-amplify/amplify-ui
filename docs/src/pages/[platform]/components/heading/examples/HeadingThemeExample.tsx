import { Heading, Flex, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'heading-theme',
  tokens: {
    components: {
      heading: {
        color: { value: '{colors.blue.80}' },

        1: {
          fontSize: { value: '{fontSizes.xxl}' },
          fontWeight: { value: '{fontWeights.bold}' },
        },
        6: {
          fontSize: { value: '{fontSizes.large}' },
          fontWeight: { value: '{fontWeights.normal}' },
        },
      },
    },
  },
};

export const HeadingThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Flex direction="column">
      <Heading level={1}>Title</Heading>
      <Heading>Default</Heading>
    </Flex>
  </ThemeProvider>
);
