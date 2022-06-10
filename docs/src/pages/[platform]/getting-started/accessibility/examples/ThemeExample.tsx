import { ThemeProvider, Card, useTheme, Theme } from '@aws-amplify/ui-react';

export const ThemeExample = () => {
  const { tokens } = useTheme();

  const theme: Theme = {
    name: 'high-contrast',
    tokens: {
      colors: {
        font: {
          primary: { value: '#000' },
        },
      },
      components: {
        card: {
          outlined: {
            borderWidth: tokens.borderWidths.large,
            borderColor: { value: '#000' },
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
