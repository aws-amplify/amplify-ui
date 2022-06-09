import { Button, Flex, Heading, Image, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function Home() {
  return (
    <Flex
      direction={{ base: 'column', large: 'row' }}
      maxWidth="32rem"
      padding="1rem"
      width="100%"
    >
      <Image
        alt="Abstract art"
        height="21rem"
        src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987"
        width="100%"
      />
      <Flex justifyContent="space-between" direction="column">
        <Heading level={3}>Abstract art</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat
          sed cras ornare arcu dui. Duis aute irure dolor in reprehenderit in
          voluptate velit esse.
        </Text>
        <Button
          variation="primary"
          onClick={() => alert('Added item to cart!')}
        >
          Add to Cart
        </Button>
      </Flex>
    </Flex>
  );
}
