import { Flex, Divider, useTheme } from '@aws-amplify/ui-react';

export const DividerStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <Flex direction="column">
      <Divider
        border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}
      />
      <Divider border="5px solid pink" borderRadius="10px" />
    </Flex>
  );
};
