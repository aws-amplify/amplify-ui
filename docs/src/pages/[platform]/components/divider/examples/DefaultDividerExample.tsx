import { Flex, Text, Divider } from '@aws-amplify/ui-react';

export const DefaultDividerExample = () => (
  <Flex direction="column">
    <Text>Before</Text>
    <Divider />
    <Text>After</Text>
  </Flex>
);
