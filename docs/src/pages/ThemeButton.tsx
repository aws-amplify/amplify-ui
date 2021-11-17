import {
  ToggleButton,
  Flex,
  Text,
  View,
  useTheme,
} from '@aws-amplify/ui-react';

const Swatch = ({ color, border }) => (
  <View
    width="2rem"
    height="2rem"
    borderRadius="2rem"
    backgroundColor={color}
    border={border}
    margin="0 0 0 -0.5rem"
  />
);

export const ThemeButton = ({ colors, label }) => {
  const { tokens } = useTheme();
  return (
    <Flex direction="column" gap={tokens.space.xs}>
      <Text>{label}</Text>
      <Flex direction="row" gap="0" justifyContent="center">
        {colors.map((color) => (
          <Swatch
            color={color}
            border={`4px solid ${tokens.colors.background.primary}`}
          />
        ))}
      </Flex>
    </Flex>
  );
};
