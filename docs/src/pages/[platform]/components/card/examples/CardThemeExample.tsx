import { Card, Text, Flex, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'card-theme',
  tokens: {
    components: {
      card: {
        // You can reference other tokens
        backgroundColor: { value: '{colors.background.success.value}' },
        borderRadius: { value: '{radii.large.value}' },
        padding: { value: '{space.xl.value}' },

        // Variations
        outlined: {
          // Or use explicit values
          borderWidth: { value: '10px' },
          backgroundColor: { value: '{colors.background.warning.value}' },
        },
        elevated: {
          backgroundColor: { value: '{colors.background.info.value}' },
          boxShadow: { value: '{shadows.large.value}' },
        },
      },
    },
  },
};

export const CardThemeExample = () => {
  return (
    <ThemeProvider theme={theme}>
      <Flex direction="row">
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
