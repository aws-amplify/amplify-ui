import { Link, useTheme } from '@aws-amplify/ui-react';

export const LinkGlobalStylingExample = () => {
  const { tokens } = useTheme();
  return <Link color={tokens.colors.red[80]}>Link Global Styling</Link>;
};
