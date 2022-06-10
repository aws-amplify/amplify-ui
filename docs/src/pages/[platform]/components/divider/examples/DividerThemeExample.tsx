import {
  Flex,
  Text,
  Divider,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
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
  <ThemeProvider theme={theme}>
    <Flex direction="column">
      <Text>Before</Text>
      <Divider />
      <Text>After</Text>
      <Divider size="large" />
    </Flex>
  </ThemeProvider>
);

/*

  borderStyle: { value: 'solid' },
  borderColor: { value: '{colors.border.primary.value}' },
  borderWidth: { value: '{borderWidths.medium.value}' },

  label: {
    color: { value: '{colors.font.tertiary.value}' },
    paddingInline: { value: '{space.medium.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
    backgroundColor: { value: '{colors.background.primary.value}' },
  },

  small: {
    borderWidth: { value: '{borderWidths.small.value}' },
  },

  large: {
    borderWidth: { value: '{borderWidths.large.value}' },
  },

  opacity: {
    value: '{opacities.60.value}',
  },

*/
