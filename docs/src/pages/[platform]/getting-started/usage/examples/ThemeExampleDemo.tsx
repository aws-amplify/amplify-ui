import { Button, ThemeProvider } from '@aws-amplify/ui-react';

const theme = {
  name: 'custom-button-theme',
  tokens: {
    components: {
      button: {
        fontWeight: { value: '{fontWeights.black.value}' },
        primary: {
          backgroundColor: { value: 'rebeccapurple' },
          _hover: {
            backgroundColor: { value: 'hotpink' },
          },
        },
      },
    },
  },
};
export const ThemeExampleDemo = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button variation="primary">Custom button</Button>
    </ThemeProvider>
  );
};
