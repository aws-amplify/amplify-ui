import { Button, Flex, Heading, Image, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function Home() {
  return (
    <Flex width="32rem" padding="2rem">
      <Image
        alt="Abstract painting"
        width="10rem"
        height="15rem"
        src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987"
      />
      <Flex direction="column" justifyContent="space-between">
        <Heading level={3}>Abstract painting</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat
          sed cras ornare arcu dui.
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
