import { Flex, ToggleButton } from '@aws-amplify/ui-react';

export const ToggleButtonVariationsExample = () => {
  return (
    <Flex>
      <ToggleButton defaultPressed>Press me!</ToggleButton>
      <ToggleButton variation="primary" defaultPressed>
        Press me!
      </ToggleButton>
      <ToggleButton variation="link" defaultPressed>
        Press me!
      </ToggleButton>
    </Flex>
  );
};
