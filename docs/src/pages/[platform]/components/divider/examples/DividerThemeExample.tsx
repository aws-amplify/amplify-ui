import { Flex, Text, Divider, AmplifyProvider } from '@aws-amplify/ui-react';

const theme = {
  name: 'divider-theme',
  tokens: {
    borderWidths: {
      // This will affect the large divider and other components that reference this
      large: { value: '20px' },
    },
    components: {
      divider: {
        borderStyle: { value: 'dotted' },
        // You can reference other theme tokens:
        borderColor: { value: '{colors.brand.secondary.80.value}' },
      },
    },
  },
};

export const DividerThemeExample = () => (
  <AmplifyProvider theme={theme}>
    <Flex direction="column">
      <Text>Before</Text>
      <Divider />
      <Text>After</Text>
      <Divider size="large" />
    </Flex>
  </AmplifyProvider>
);
