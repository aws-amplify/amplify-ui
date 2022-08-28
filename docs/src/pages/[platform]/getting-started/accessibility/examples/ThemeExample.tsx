import { ThemeProvider, Card } from '@aws-amplify/ui-react';

export const ThemeExample = () => {
  const theme = {
    name: 'high-contrast',
    tokens: {
      colors: {
        font: {
          primary: { value: '{colors.black}' },
        },
      },
      components: {
        card: {
          outlined: {
            borderWidth: { value: '{borderWidths.large}' },
            borderColor: { value: '{colors.black}' },
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Card variation="outlined">Example Card</Card>
    </ThemeProvider>
  );
};
