import { Flex, PhoneNumberField } from '@aws-amplify/ui-react';

export const PhoneNumberFieldErrorExample = () => (
  <Flex gap="1rem" direction="column">
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Phone Number"
      defaultValue="1234"
      hasError={true}
      errorMessage="Not a valid phone number! 😱"
    />
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Phone Number"
      defaultValue="1234"
      hasError={true}
      variation="quiet"
      errorMessage="Not a valid phone number! 😱"
    />
  </Flex>
);
