import { Alert, Flex, ThemeProvider } from '@aws-amplify/ui-react';

const theme = {
  name: 'alert-theme',
  // This will override the info icon
  icons: {
    alert: {
      info: {
        pathData:
          'M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z',
      },
    },
  },
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

export const AlertThemeExample = () => {
  return (
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
};
