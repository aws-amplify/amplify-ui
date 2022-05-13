import { Flex, Text, Divider } from '@aws-amplify/ui-react';

export const VerticalDividerExample = () => (
  <Flex direction="row" justifyContent="space-around">
    <Text>Before</Text>
    <Divider orientation="vertical" />
    <Text>After</Text>
  </Flex>
);
