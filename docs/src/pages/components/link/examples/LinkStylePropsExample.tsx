import { Link, useTheme } from '@aws-amplify/ui-react';

export const LinkStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <Link
      fontSize={tokens.fontSizes.large}
      fontWeight={tokens.fontWeights.bold}
    >
      My Link
    </Link>
  );
};
