import { View, useTheme } from '@aws-amplify/ui-react';

export const StylePropsExample = () => {
  const { tokens } = useTheme();

  return (
    <View
      backgroundColor={tokens.colors.green[20]}
      borderRadius={tokens.radii.large}
      textAlign="center"
      fontSize={tokens.fontSizes.xxxxl}
    >
      🌲🌲🌲 🏕 🌲🌲🌲
    </View>
  );
};
