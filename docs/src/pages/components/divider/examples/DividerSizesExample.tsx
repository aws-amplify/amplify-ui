import { Flex, Divider } from '@aws-amplify/ui-react';

export const DividerSizesExample = () => (
  <Flex direction="column">
    <Divider size="small" />
    <Divider />
    <Divider size="large" />
  </Flex>
);
