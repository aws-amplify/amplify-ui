import { Badge, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'badge-theme',
  tokens: {
    components: {
      badge: {
        // Default styles
        color: { value: '{colors.white.value}' },
        fontWeight: { value: '{fontWeights.normal.value}' },
        fontSize: { value: '{fontSizes.large.value}' },
        backgroundColor: { value: '{colors.purple.80.value}' },
        paddingVertical: { value: '{space.small.value}' },
        paddingHorizontal: { value: '{space.medium.value}' },
        borderRadius: { value: '{radii.small.value}' },

        // Variations
        success: {
          color: { value: '{colors.black.value}' },
          backgroundColor: { value: '{colors.yellow.60.value}' },
        },

        // Sizes
        large: {
          fontSize: { value: '{fontSizes.xxl.value}' },
        },
      },
    },
  },
};

export const BadgeThemeExample = () => (
  <ThemeProvider theme={theme}>
    <>
      <Badge>Default</Badge>
      <Badge variation="success">Success</Badge>
      <Badge size="large">Large</Badge>
    </>
  </ThemeProvider>
);
