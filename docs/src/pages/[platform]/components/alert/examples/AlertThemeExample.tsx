import { Alert, Flex, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'alert-theme',
  tokens: {
    components: {
      alert: {
        // Default styles
        backgroundColor: { value: '{colors.teal.20}' },

        icon: {
          size: { value: '{fontSizes.xxxl}' },
        },

        heading: {
          fontSize: { value: '{fontSizes.large}' },
          fontWeight: { value: '{fontWeights.normal}' },
        },

        // Variations
        info: {
          color: { value: 'white' },
          backgroundColor: { value: '{colors.blue.80}' },
        },

        success: {
          color: { value: 'black' },
          backgroundColor: { value: '{colors.yellow.40}' },
        },
      },
    },
  },
};

export const AlertThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Flex direction="column">
      <Alert heading="Default alert title">Hello</Alert>
      <Alert variation="info" heading="Info">
        Here is some info
      </Alert>
      <Alert variation="success" heading="Success">
        Hooray!
      </Alert>
    </Flex>
  </ThemeProvider>
);
