'use client';
import theme from '@/theme';
import { Button, Flex } from '@aws-amplify/ui-react';

export default function Client() {
  return (
    <Flex
      direction="row"
      padding="large"
      // backgroundColor={theme.tokens.colors.green[60]}
    >
      <Button>Hello</Button>
      <Button colorTheme="error">Hello</Button>
      <Button variation="primary">Hello</Button>
    </Flex>
  );
}
