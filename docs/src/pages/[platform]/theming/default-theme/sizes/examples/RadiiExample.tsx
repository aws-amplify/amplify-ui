import { Card, useTheme } from '@aws-amplify/ui-react';

export const RadiiExample = () => {
  const { tokens } = useTheme();
  return (
    <Card
      borderRadius={tokens.radii.xxxl}
      backgroundColor={tokens.colors.green[10]}
    >
      Text
    </Card>
  );
};
