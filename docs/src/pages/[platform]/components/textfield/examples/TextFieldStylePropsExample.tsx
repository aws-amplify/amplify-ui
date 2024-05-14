import { Text, TextField, useTheme } from '@aws-amplify/ui-react';

export const TextFieldStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <TextField
        label={
          <Text
            fontWeight={tokens.fontWeights.bold}
            fontSize={tokens.fontSizes.xl}
          >
            Name:
          </Text>
        }
        padding="xl"
        border={`1px solid ${tokens.colors.primary[60]}`}
      />
      <TextField
        label="Special Field"
        inputStyles={{
          backgroundColor: 'primary.10',
          border: `1px solid ${tokens.colors.primary[60]}`,
        }}
      />
    </>
  );
};
