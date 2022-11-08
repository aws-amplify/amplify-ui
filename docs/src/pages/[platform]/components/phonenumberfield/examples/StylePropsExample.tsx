import { PhoneNumberField, Text, useTheme } from '@aws-amplify/ui-react';

export const StylePropsExample = () => {
  const { tokens } = useTheme();

  return (
    <>
      <PhoneNumberField
        defaultDialCode="+1"
        label={
          <Text fontWeight="bold" fontSize={tokens.fontSizes.large}>
            Phone Number:
          </Text>
        }
        padding="xl"
        border={`1px solid ${tokens.colors.brand.primary[60]}`}
      />
      <PhoneNumberField
        defaultDialCode="+1"
        label="Phone number"
        inputStyles={{
          backgroundColor: 'brand.primary.10',
        }}
      />
    </>
  );
};
