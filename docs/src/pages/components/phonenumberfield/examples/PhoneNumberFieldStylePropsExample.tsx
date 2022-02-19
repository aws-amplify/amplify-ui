import { PhoneNumberField, Text, useTheme } from '@aws-amplify/ui-react';

export const PhoneNumberFieldStylePropsExample = () => {
  const { tokens } = useTheme();

  return (
    <PhoneNumberField
      direction="row"
      alignItems="baseline"
      defaultCountryCode="+1"
      label={
        <Text
          fontWeight={tokens.fontWeights.extrabold}
          fontSize={tokens.fontSizes.large}
        >
          Phone Number:
        </Text>
      }
      fontSize="1.5rem"
      backgroundColor="#fff1e7"
      color="#000"
    />
  );
};
