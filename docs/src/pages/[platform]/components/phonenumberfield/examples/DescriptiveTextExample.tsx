import { PhoneNumberField, Text } from '@aws-amplify/ui-react';

export const DescriptiveTextExample = () => (
  <>
    <PhoneNumberField
      defaultDialCode="+1"
      label="Phone Number"
      descriptiveText="This is basic descriptive text"
    />
    <PhoneNumberField
      defaultDialCode="+1"
      label="Phone Number"
      descriptiveText={
        <Text
          color="rebeccapurple"
          fontStyle="normal"
          fontSize="1.2rem"
          as="span"
        >
          This is customized descriptive text
        </Text>
      }
    />
  </>
);
