import { Button, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // default theme

const theme = {
  name: 'custom-button-theme',
  tokens: {
    components: {
      button: {
        // this will affect the font weight of all Buttons
        fontWeight: { value: '{fontWeights.black.value}' },
        // this will only style Buttons which are the "primary" variation
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variation="primary">Custom button</Button>
    </ThemeProvider>
  );
}

export default App;
