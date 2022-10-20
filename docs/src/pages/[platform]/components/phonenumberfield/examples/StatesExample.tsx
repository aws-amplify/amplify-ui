import { PhoneNumberField, Flex } from '@aws-amplify/ui-react';

export const StatesExample = () => (
  <Flex direction="column" gap="2rem">
    <PhoneNumberField
      defaultDialCode="+1"
      label="Disabled"
      isDisabled={true}
      descriptiveText="You can't submit me"
    />
    <PhoneNumberField
      defaultDialCode="+1"
      label="Readonly"
      isReadOnly={true}
      descriptiveText="You can't edit me"
    />
  </Flex>
);
