import { Flex, ToggleButton } from '@aws-amplify/ui-react';

export const ToggleButtonSizeExample = () => {
  return (
    <Flex>
      <ToggleButton size="small">Press me!</ToggleButton>
      <ToggleButton>Press me!</ToggleButton>
      <ToggleButton size="large">Press me!</ToggleButton>
    </Flex>
  );
};
