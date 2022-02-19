import { View, PhoneNumberField, Text } from '@aws-amplify/ui-react';

export const PhoneNumberFieldDescriptiveTextExample = () => (
  <View width="100%">
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Phone Number"
      descriptiveText={
        <Text
          as="span"
          color="rebeccapurple"
          fontStyle="italic"
          fontSize="0.8rem"
        >
          Please enter your phone number
        </Text>
      }
    />
  </View>
);
