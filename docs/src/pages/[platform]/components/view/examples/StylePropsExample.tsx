import { View, useTheme } from '@aws-amplify/ui-react';

export const StylePropsExample = () => {
  const { tokens } = useTheme();

  return (
    <View
      backgroundColor={tokens.colors.green[20]}
      borderRadius={tokens.radii.large}
      fontSize={tokens.fontSizes.xxxxl}
      textAlign="center"
    >
      🌲🌲🌲 🏕 🌲🌲🌲
    </View>
  );
};
