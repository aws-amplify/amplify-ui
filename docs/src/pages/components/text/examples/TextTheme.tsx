import { AmplifyProvider, Flex, Text } from '@aws-amplify/ui-react';

import { VARIATIONS_OPTIONS } from '../constants';

const theme = {
  name: 'text-theme',
  tokens: {
    components: {
      text: {
        color: { value: '{colors.neutral.100}' },
        primary: {
          color: { value: '{colors.green.40}' },
        },
        secondary: {
          color: { value: '{colors.teal.40}' },
        },
        tertiary: {
          color: { value: '{colors.blue.40}' },
        },
        error: {
          color: { value: '{colors.red.60}' },
        },
        warning: {
          color: { value: '{colors.pink.60}' },
        },
        info: {
          color: { value: '{colors.brand.primary.90}' },
        },
        success: {
          color: { value: '{colors.brand.secondary.90}' },
        },
      },
    },
  },
};

export const TextThemeExample = () => (
  <AmplifyProvider theme={theme}>
    <Flex direction="row">
      <Text>Default</Text>
      {VARIATIONS_OPTIONS.map((variation) => (
        <Text key={variation} variation={variation}>
          {variation}
        </Text>
      ))}
    </Flex>
  </AmplifyProvider>
);
