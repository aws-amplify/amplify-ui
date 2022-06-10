import { Alert, Flex, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'alert-theme',
  tokens: {
    components: {
      alert: {
        // Default styles
        backgroundColor: { value: '{colors.teal.80.value}' },

        icon: {
          size: { value: '{fontSizes.xxxl.value}' },
        },

        heading: {
          fontSize: { value: '{fontSizes.large.value}' },
          fontWeight: { value: '{fontWeights.normal.value}' },
        },

        // Variations
        info: {
          color: { value: '{colors.white.value}' },
          backgroundColor: { value: '{colors.purple.80.value}' },
        },

        success: {
          color: { value: '{colors.black.value}' },
          backgroundColor: { value: '{colors.yellow.40.value}' },
        },
      },
    },
  },
};

export const AlertThemeExample = () => (
  <ThemeProvider theme={theme}>
    <Flex direction="column">
      <Alert heading="testing123">Hello</Alert>
      <Alert variation="info" heading="Info">
        Here is some info
      </Alert>
      <Alert variation="success" heading="Success">
        Hooray!
      </Alert>
    </Flex>
  </ThemeProvider>
);
