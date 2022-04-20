import { Flex, Placeholder } from '@aws-amplify/ui-react';

export const PlaceholderSizeExample = () => {
  return (
    <Flex direction="column">
      <Placeholder size="small" />
      <Placeholder />
      <Placeholder size="large" />
    </Flex>
  );
};
