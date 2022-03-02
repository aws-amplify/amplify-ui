import { Flex, Button, ThemeProvider } from '@aws-amplify/ui-react';

const theme = {
  name: 'button-theme',
  tokens: {
    colors: {
      border: {
        // this will affect the default button's border color
        primary: { value: 'black' },
      },
    },
    components: {
      button: {
        // this will affect the font weight of all button variants
        fontWeight: { value: '{fontWeights.black.value}' },
        // style the primary variation
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

export const ButtonThemeExample = () => (
  <ThemeProvider theme={theme}>
    <Flex direction="row">
      <Button>Default</Button>
      <Button variation="primary">Primary</Button>
      <Button variation="link">Link</Button>
    </Flex>
  </ThemeProvider>
);
