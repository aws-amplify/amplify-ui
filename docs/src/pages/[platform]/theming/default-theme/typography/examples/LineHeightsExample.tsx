import { Grid, Text, useTheme } from '@aws-amplify/ui-react';

export const LineHeightsExample = () => {
  const { tokens } = useTheme();
  return (
    <Grid
      gap={tokens.space.medium}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <Text lineHeight={tokens.lineHeights.small}>
        This is some example paragraph text with a small line height.
      </Text>
      <Text lineHeight={tokens.lineHeights.medium}>
        This is some example paragraph text with a medium line height.
      </Text>
      <Text lineHeight={tokens.lineHeights.large}>
        This is some example paragraph text with a large line height.
      </Text>
    </Grid>
  );
};
