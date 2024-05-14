import { Alert, useTheme } from '@aws-amplify/ui-react';

export const AlertStylePropsExample = () => {
  const { tokens } = useTheme();

  return (
    <Alert
      backgroundColor={tokens.colors.primary[10]}
      color={tokens.colors.font.primary}
      fontWeight="bold"
      border={`${tokens.borderWidths.large} solid ${tokens.colors.primary[80]}`}
      borderRadius="10px"
    >
      Passing props directly
    </Alert>
  );
};
