import { Text, Input, Label, useTheme } from '@aws-amplify/ui-react';

export const InputStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <Label htmlFor="name">
        <Text
          fontWeight={tokens.fontWeights.bold}
          fontSize={tokens.fontSizes.xl}
        >
          Name:
        </Text>
      </Label>
      <Input
        id="name"
        fontWeight={tokens.fontWeights.bold}
        fontSize={tokens.fontSizes.xl}
        padding="xl"
        border={`1px solid ${tokens.colors.brand.primary[60]}`}
      />
      <Label htmlFor="special">Special Field</Label>
      <Input
        id="special"
        backgroundColor="brand.primary.10"
        border={`1px solid ${tokens.colors.brand.primary[60]}`}
      />
    </>
  );
};
