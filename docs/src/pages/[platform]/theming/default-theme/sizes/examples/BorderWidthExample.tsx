import { Button, useTheme, ThemeProvider } from '@aws-amplify/ui-react';

export const BorderWidthExample = () => {
  const { tokens } = useTheme();

  const theme = {
    name: 'custom-theme',
    tokens: {
      components: {
        button: {
          borderWidth: tokens.borderWidths.large,
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Button color={tokens.colors.brand.secondary[60]}>
        Custom border button
      </Button>
    </ThemeProvider>
  );
};
