import { Flex, ToggleButton } from '@aws-amplify/ui-react';

export const DisabledToggleButtonExample = () => {
  return (
    <Flex>
      <ToggleButton isDisabled>Press me!</ToggleButton>
      <ToggleButton isDisabled defaultPressed>
        Press me!
      </ToggleButton>
    </Flex>
  );
};
