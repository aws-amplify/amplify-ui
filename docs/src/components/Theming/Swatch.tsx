import { Text, Grid, Flex, View, useTheme } from '@aws-amplify/ui-react';

export function Swatch({ colorGroup, color, value }) {
  const { tokens } = useTheme();
  return (
    <Flex>
      <View width="40px" height="40px" backgroundColor={value}></View>
      <div>
        <Text fontWeight="bold">{color}</Text>
        <Text
          color={tokens.colors.neutral['80']}
          fontSize={tokens.fontSizes.small}
        >
          {value}
        </Text>
      </div>
    </Flex>
  );
}

export function SwatchGroup({ colorGroup }) {
  const { tokens } = useTheme();
  console.log('tokens', tokens);
  const tokenGroup = tokens.colors[colorGroup];
  let swatches = [];
  for (const [key, value] of Object.entries(tokenGroup)) {
    swatches.push({
      color: key,
      ...value,
    });
  }
  return (
    <Grid
      rowGap={tokens.space.medium}
      templateColumns="repeat(auto-fill, minmax(14rem, 1fr))"
    >
      {swatches.map((swatch) => {
        return (
          <Swatch
            key={swatch.name}
            colorGroup={colorGroup}
            color={swatch.color}
            value={swatch.value}
          />
        );
      })}
    </Grid>
  );
}
