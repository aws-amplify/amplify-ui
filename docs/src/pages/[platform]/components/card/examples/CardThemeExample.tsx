import { Card, Text, Flex, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'card-theme',
  tokens: {
    components: {
      card: {
        // You can reference other tokens
        backgroundColor: { value: '{colors.background.success}' },
        borderRadius: { value: '{radii.large}' },
        padding: { value: '{space.xl}' },

        // Variations
        outlined: {
          // Or use explicit values
          borderWidth: { value: '10px' },
          backgroundColor: { value: '{colors.background.warning}' },
        },
        elevated: {
          backgroundColor: { value: '{colors.background.info}' },
          boxShadow: { value: '{shadows.large}' },
        },
      },
    },
  },
};

export const CardThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Flex>
        <Card>
          <Text>Default</Text>
        </Card>
        <Card variation="outlined">
          <Text>Outlined</Text>
        </Card>
        <Card variation="elevated">
          <Text>Elevated</Text>
        </Card>
      </Flex>
    </ThemeProvider>
  );
};
