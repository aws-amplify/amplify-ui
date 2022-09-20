import { PhoneNumberField, Flex } from '@aws-amplify/ui-react';

export const VariationExample = () => (
  <Flex direction="column">
    <PhoneNumberField defaultDialCode="+1" label="Default" />
    <PhoneNumberField defaultDialCode="+1" label="Quiet" variation="quiet" />
  </Flex>
);
