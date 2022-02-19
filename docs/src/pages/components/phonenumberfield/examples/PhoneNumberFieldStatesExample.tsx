import { Flex, PhoneNumberField } from '@aws-amplify/ui-react';

export const PhoneNumberFieldStatesExample = () => (
  <Flex direction="column" gap="1rem">
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Disabled"
      isDisabled={true}
      descriptiveText="You can't submit me"
    />
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Readonly"
      isReadOnly={true}
      descriptiveText="You can't edit me"
    />
  </Flex>
);
