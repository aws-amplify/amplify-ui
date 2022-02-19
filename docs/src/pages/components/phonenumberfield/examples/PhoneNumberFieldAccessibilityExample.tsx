import { Flex, PhoneNumberField } from '@aws-amplify/ui-react';

export const PhoneNumberFieldAccessibilityExample = () => (
  <Flex direction="column">
    <PhoneNumberField
      label="Phone Number"
      labelHidden={true}
      defaultCountryCode="+1"
      placeholder="Phone Number"
    />
  </Flex>
);
