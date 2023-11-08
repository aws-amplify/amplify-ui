import { Badge, useTheme } from '@aws-amplify/ui-react';

export const BadgeStyleProps = () => {
  const { tokens } = useTheme();
  return (
    <Badge
      backgroundColor={tokens.colors.secondary[20]}
      color={tokens.colors.secondary[90]}
    >
      Badge
    </Badge>
  );
};
