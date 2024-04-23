'use client';
import { MyClientComponent } from '@/components/Test/ClientComponent';
import { MyServerComponent } from '@/components/Test/ServerComponent';
import { theme } from '@/theme';
import {
  Alert,
  Badge,
  Button,
  Flex,
  Message,
  Text,
} from '@aws-amplify/ui-react';

export default function ThemePage() {
  return (
    <Flex direction="column">
      <Flex
        direction="row"
        backgroundColor="blue"
        // _hover={{
        //   backgroundColor: 'red',
        // }}
        // _active={{
        //   backgroundColor: 'hotpink',
        // }}
      >
        <Badge variation="success">Hello</Badge>
      </Flex>
      <Button variation="primary">Hello</Button>
      <MyClientComponent />
      <MyServerComponent />
      <Text color={theme.tokens.colors.font.success}>Success!</Text>
      <Alert heading="Hello" />
      <Alert heading="Hello success" variation="success" />
      <Alert heading="Hello" variation="info" />
      <Button variation="link" colorTheme="error">
        Error
      </Button>
    </Flex>
  );
}
