'use client';
import theme from '@/theme';
import { Alert, Button, Flex } from '@aws-amplify/ui-react';

export default function Client() {
  return (
    <>
      <Alert>Testing</Alert>

      <Flex
        direction="row"
        padding="large"
        // backgroundColor={theme.tokens.colors.green[60]}
      >
        <Button>Hello</Button>
        <Button colorTheme="error">Hello</Button>
        <Button variation="primary">Hello</Button>
        <Button variation="primary" isDisabled>
          Hello
        </Button>
      </Flex>
    </>
  );
}
