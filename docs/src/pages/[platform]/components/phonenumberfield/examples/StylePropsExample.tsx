import { PhoneNumberField, Text, useTheme } from '@aws-amplify/ui-react';

export const StylePropsExample = () => {
  const { tokens } = useTheme();

  return (
    <PhoneNumberField
      defaultDialCode="+1"
      label={
        <Text fontWeight="bold" fontSize={tokens.fontSizes.large}>
          Phone Number:
        </Text>
      }
      direction="row"
      alignItems="center"
      fontSize={tokens.fontSizes.large}
      backgroundColor={tokens.colors.teal[60]}
      color={tokens.colors.black}
    />
  );
};
