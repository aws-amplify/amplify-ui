import { Card, Heading, Text, ThemeProvider } from '@aws-amplify/ui-react';

const theme = {
  name: 'custom-theme',
  tokens: {
    components: {
      card: {
        backgroundColor: { value: '{colors.background.secondary}' },
        outlined: {
          borderColor: { value: '{colors.black}' },
        },
      },
      heading: {
        color: { value: '{colors.brand.secondary[80]}' },
      },
      text: {
        color: { value: '{colors.brand.primary[80]}' },
      },
    },
  },
};

export const CustomThemeExample = () => {
  return (
    <ThemeProvider theme={theme}>
      <Card variation="outlined">
        <Heading level={6}>Heading text</Heading>
        <Text>Some sample text for this card.</Text>
      </Card>
    </ThemeProvider>
  );
};
