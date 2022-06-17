import { Badge, ThemeProvider, Theme, Flex } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'badge-theme',
  tokens: {
    components: {
      badge: {
        // Default styles
        color: { value: '{colors.white}' },
        fontWeight: { value: '{fontWeights.normal}' },
        fontSize: { value: '{fontSizes.medium}' },
        backgroundColor: { value: '{colors.blue.80}' },
        paddingVertical: { value: '{space.small}' },
        paddingHorizontal: { value: '{space.medium}' },
        borderRadius: { value: '{radii.small}' },

        // Variations
        success: {
          color: { value: '{colors.black}' },
          backgroundColor: { value: '{colors.green.60}' },
        },

        // Sizes
        large: {
          fontSize: { value: '{fontSizes.xxl}' },
        },
      },
    },
  },
};

export const BadgeThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Flex alignItems="flex-end">
      <Badge>Default</Badge>
      <Badge variation="success">Success</Badge>
      <Badge size="large">Large</Badge>
    </Flex>
  </ThemeProvider>
);
