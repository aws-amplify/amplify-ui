import { Grid, View, useTheme } from '@aws-amplify/ui-react';

export const SpaceExample = () => {
  const { tokens } = useTheme();
  return (
    <Grid gap={tokens.space.xxl} templateColumns="1fr 1fr">
      <View
        padding={tokens.space.medium}
        backgroundColor={tokens.colors.neutral[20]}
      ></View>
      <View
        padding={tokens.space.medium}
        backgroundColor={tokens.colors.neutral[20]}
      ></View>
    </Grid>
  );
};
