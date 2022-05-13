import { Badge, useTheme } from '@aws-amplify/ui-react';

export const BadgeStyleProps = () => {
  const { tokens } = useTheme();
  return (
    <Badge
      backgroundColor={tokens.colors.brand.secondary[20]}
      color={tokens.colors.brand.secondary[90]}
    >
      Badge
    </Badge>
  );
};
