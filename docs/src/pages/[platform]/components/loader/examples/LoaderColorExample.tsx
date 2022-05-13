import { Loader, useTheme } from '@aws-amplify/ui-react';

export const LoaderColorExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <Loader
        emptyColor={`${tokens.colors.black}`}
        filledColor={`${tokens.colors.orange[40]}`}
      />
      <Loader
        variation="linear"
        emptyColor={`${tokens.colors.black}`}
        filledColor={`${tokens.colors.orange[40]}`}
      />
    </>
  );
};
