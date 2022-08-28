import { Icon, useTheme } from '@aws-amplify/ui-react';

export const IconColorExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <Icon
        ariaLabel="Flag"
        pathData="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"
        color={tokens.colors.pink[80]}
      />
      <Icon
        ariaLabel="Flag"
        pathData="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"
        color="rebeccapurple"
      />
    </>
  );
};
