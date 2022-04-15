import { Link, useTheme } from '@aws-amplify/ui-react';

export const LinkStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <Link color={tokens.colors.red[80]} fontWeight={tokens.fontWeights.bold}>
      My Link
    </Link>
  );
};
