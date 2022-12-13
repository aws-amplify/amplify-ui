import { Button, useTheme } from '@aws-amplify/ui-react';

export const BasicExample = () => {
  const { tokens } = useTheme();

  return (
    <Button border={`2px solid ${tokens.colors.blue[80]}`} color="purple.80">
      Themed Button
    </Button>
  );
};
