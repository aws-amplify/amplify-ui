import { Text, TextAreaField, useTheme } from '@aws-amplify/ui-react';

export const TextAreaFieldStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <TextAreaField
        label={
          <Text
            fontWeight={tokens.fontWeights.bold}
            fontSize={tokens.fontSizes.xl}
          >
            Address:
          </Text>
        }
        padding="xl"
        border={`1px solid ${tokens.colors.brand.primary[60]}`}
      />
      <TextAreaField
        label="Special Field"
        inputStyles={{
          backgroundColor: 'brand.primary.10',
          border: `1px solid ${tokens.colors.brand.primary[60]}`,
        }}
      />
    </>
  );
};
