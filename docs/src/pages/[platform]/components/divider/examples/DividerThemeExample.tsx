import { Divider, Flex, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'divider-theme',
  tokens: {
    components: {
      divider: {
        borderStyle: { value: 'dotted' },
        borderColor: { value: '{colors.brand.secondary.80.value}' },
        borderWidth: { value: '{borderWidths.small.value}' },

        label: {
          color: { value: '{colors.white.value}' },
          backgroundColor: { value: '{colors.brand.secondary.80.value}' },
        },

        large: {
          borderWidth: { value: '{borderWidths.large.value}' },
        },
      },
    },
  },
};

export const DividerThemeExample = () => (
  <ThemeProvider theme={theme}>
    <Flex direction="column" gap="3rem">
      <Divider label="Default" />
      <Divider size="large" label="Large" />
    </Flex>
  </ThemeProvider>
);
