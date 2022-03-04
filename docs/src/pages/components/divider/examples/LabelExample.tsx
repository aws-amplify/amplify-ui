import { Flex, Text, Divider } from '@aws-amplify/ui-react';

export const LabelExample = () => (
  <Flex direction="column">
    <Text>Before</Text>
    <Divider label="OR" />
    <Text>After</Text>
  </Flex>
);
