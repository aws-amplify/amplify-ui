import { PhoneNumberField, Text } from '@aws-amplify/ui-react';

export const DescriptiveTextExample = () => (
  <>
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Phone Number"
      descriptiveText="This is basic descriptive text"
    />
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Phone Number"
      descriptiveText={
        <Text color="rebeccapurple" fontStyle="normal" fontSize="1.2rem">
          This is customized descriptive text
        </Text>
      }
    />
  </>
);
