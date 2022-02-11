import { Text, TextField, useTheme } from '@aws-amplify/ui-react';

export const TextFieldStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <TextField
        direction="row"
        alignItems="bottom"
        fontSize={tokens.fontSizes.xl}
        label={
          <Text
            fontWeight={tokens.fontWeights.bold}
            fontSize={tokens.fontSizes.xl}
          >
            Name:
          </Text>
        }
        backgroundColor={tokens.colors.background.primary}
        color={tokens.colors.black}
        width="400px"
      />
      <TextField
        label="Special Field"
        inputStyles={{
          backgroundColor: tokens.colors.brand.primary[10],
          border: `${tokens.borderWidths.medium} solid ${tokens.colors.brand.primary[80]}`,
        }}
        fontSize={tokens.fontSizes.xl}
        backgroundColor={tokens.colors.background.primary}
        color={tokens.colors.black}
        width="400px"
      />
    </>
  );
};
