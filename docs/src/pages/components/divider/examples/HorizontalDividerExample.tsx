import { Flex, Text, Divider } from '@aws-amplify/ui-react';

export const HorizontalDividerExample = () => (
  <Flex direction="column">
    <Text>Before</Text>
    <Divider orientation="horizontal" />
    <Text>After</Text>
  </Flex>
);
