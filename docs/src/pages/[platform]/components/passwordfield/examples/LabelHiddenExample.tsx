import { PasswordField, Text, Flex, useTheme } from '@aws-amplify/ui-react';

export const LabelHiddenExample = () => {
  const { tokens } = useTheme();
  return (
    <Flex>
      <Text paddingTop={tokens.space.small}>🚀</Text>
      <PasswordField label="Space Rocket Launch Codes" labelHidden={true} />
    </Flex>
  );
};
