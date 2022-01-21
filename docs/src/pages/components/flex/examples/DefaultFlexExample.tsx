import { Flex, Button } from '@aws-amplify/ui-react';

export const DefaultFlexExample = () => (
  <Flex>
    <Button backgroundColor="var(--amplify-colors-pink-10)">Button 1</Button>
    <Button backgroundColor="var(--amplify-colors-pink-20)">Button 2</Button>
    <Button backgroundColor="var(--amplify-colors-pink-40)">Button 3</Button>
  </Flex>
);
