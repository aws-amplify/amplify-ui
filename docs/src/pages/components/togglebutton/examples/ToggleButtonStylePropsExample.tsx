import { Flex, ToggleButton, useTheme } from '@aws-amplify/ui-react';

export const ToggleButtonStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <Flex>
      <ToggleButton color={tokens.colors.orange[60]}>Press me!</ToggleButton>
    </Flex>
  );
};
