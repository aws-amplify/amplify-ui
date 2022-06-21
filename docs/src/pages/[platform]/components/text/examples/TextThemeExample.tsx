import { Text, Flex, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'text-theme',
  tokens: {
    components: {
      text: {
        color: { value: '{colors.green.80}' },
        primary: {
          color: { value: '{colors.teal.80}' },
        },
        warning: {
          color: { value: '{colors.pink.80}' },
        },
      },
    },
  },
};

export const TextThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Flex>
      <Text>Default</Text>
      <Text variation="primary">Primary</Text>
      <Text variation="warning">Warning</Text>
    </Flex>
  </ThemeProvider>
);
