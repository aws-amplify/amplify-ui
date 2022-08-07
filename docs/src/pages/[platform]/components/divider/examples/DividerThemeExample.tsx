import { Divider, Flex, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'divider-theme',
  tokens: {
    components: {
      divider: {
        borderStyle: { value: 'dotted' },
        borderColor: { value: '{colors.blue.80}' },
        borderWidth: { value: '{borderWidths.small}' },

        label: {
          color: { value: '{colors.white}' },
          backgroundColor: { value: '{colors.blue.80}' },
        },

        large: {
          borderWidth: { value: '{borderWidths.large}' },
        },
      },
    },
  },
};

export const DividerThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Flex direction="column" gap="3rem">
      <Divider label="Default" />
      <Divider size="large" label="Large" />
    </Flex>
  </ThemeProvider>
);
