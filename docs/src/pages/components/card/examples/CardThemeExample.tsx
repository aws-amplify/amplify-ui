import { ThemeProvider, Card, Text, Flex } from '@aws-amplify/ui-react';

const cardTheme = {
  name: 'card-theme',
  tokens: {
    components: {
      card: {
        // You can reference other tokens
        backgroundColor: { value: '{colors.background.success.value}' },
        outlined: {
          // Or use explicit values
          borderWidth: { value: '10px' },
        },
        elevated: {
          boxShadow: { value: '{shadows.large.value}' },
        },
      },
    },
  },
};

export const CardThemeExample = () => {
  return (
    <ThemeProvider theme={cardTheme}>
      <Flex direction="row">
        <Card>
          <Text>Hello</Text>
        </Card>
        <Card variation="elevated">
          <Text>Hello</Text>
        </Card>
        <Card variation="outlined">
          <Text>Hello</Text>
        </Card>
      </Flex>
    </ThemeProvider>
  );
};
