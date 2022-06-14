import {
  ThemeProvider,
  Card,
  Heading,
  Text,
  useTheme,
} from '@aws-amplify/ui-react';

export const ColorsExample = () => {
  const { tokens } = useTheme();
  const theme = {
    name: 'custom-theme',
    tokens: {
      components: {
        card: {
          backgroundColor: tokens.colors.background.secondary,
          outlined: {
            borderColor: tokens.colors.black,
          },
        },
        text: {
          color: tokens.colors.neutral[80],
        },
        heading: {
          color: tokens.colors.brand.secondary[80],
        },
      },
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <Card variation="outlined">
        <Heading level={6}>Heading text</Heading>
        <Text>Some sample text for this card.</Text>
      </Card>
    </ThemeProvider>
  );
};
