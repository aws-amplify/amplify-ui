import { Flex, Message, Theme, ThemeProvider } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'message-theme',
  tokens: {
    components: {
      message: {
        borderRadius: '12px',
        borderStyle: 'dotted',
        borderWidth: '2px',
        outlined: {
          error: {
            color: '{colors.pink.100}',
            backgroundColor: '{colors.pink.10}',
            borderColor: '{colors.pink.100}',
          },
        },
        filled: {
          info: {
            backgroundColor: '{colors.teal.10}',
            color: '{colors.teal.90}',
          },
        },
      },
    },
  },
};

export const MessageThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Flex direction="column">
        <Message colorTheme="info" heading="Custom info Message theme">
          Content for custom info message.
        </Message>
        <Message
          colorTheme="error"
          variation="outlined"
          heading="Custom error outlined Message theme"
        >
          Content for custom error outlined message.
        </Message>
      </Flex>
    </ThemeProvider>
  );
};
