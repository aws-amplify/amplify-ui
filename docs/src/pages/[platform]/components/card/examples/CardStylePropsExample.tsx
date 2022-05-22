import { Card, Text, useTheme } from '@aws-amplify/ui-react';

export const CardStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <Card backgroundColor={tokens.colors.brand.primary[20]}>
      <Text>Special card!</Text>
    </Card>
  );
};
