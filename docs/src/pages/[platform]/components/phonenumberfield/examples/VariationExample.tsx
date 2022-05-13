import { PhoneNumberField, Flex } from '@aws-amplify/ui-react';

export const VariationExample = () => (
  <Flex direction="column">
    <PhoneNumberField defaultCountryCode="+1" label="Default" />
    <PhoneNumberField defaultCountryCode="+1" label="Quiet" variation="quiet" />
  </Flex>
);
