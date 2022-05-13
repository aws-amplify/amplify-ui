import { Grid, View, useTheme } from '@aws-amplify/ui-react';

export const GridRowAndColumnSpanExample = () => {
  const { tokens } = useTheme();
  return (
    <Grid
      templateColumns="1fr 1fr"
      templateRows="10rem 10rem 10rem"
      gap={tokens.space.small}
    >
      <View columnSpan={2} backgroundColor={tokens.colors.orange[10]}></View>
      <View rowSpan={2} backgroundColor={tokens.colors.orange[20]}></View>
      <View backgroundColor={tokens.colors.orange[40]}></View>
      <View backgroundColor={tokens.colors.orange[60]}></View>
    </Grid>
  );
};
