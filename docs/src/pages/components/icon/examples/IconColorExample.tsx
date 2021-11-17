import { IconStar, useTheme } from '@aws-amplify/ui-react';

export const IconColorExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <IconStar color={tokens.colors.pink[80]} />
      <IconStar color="rebeccapurple" />
    </>
  );
};
