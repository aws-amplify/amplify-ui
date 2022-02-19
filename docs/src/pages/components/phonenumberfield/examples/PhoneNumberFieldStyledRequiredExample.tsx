import { Flex, PhoneNumberField, Text, Button } from '@aws-amplify/ui-react';

export const PhoneNumberFieldStyledRequiredExample = () => (
  <Flex as="form" direction="column">
    <PhoneNumberField
      defaultCountryCode="+1"
      label={
        <Text>
          Phone Number
          <Text as="span" fontSize="0.8rem" color="red" padding="0.25rem">
            (required)
          </Text>
        </Text>
      }
      isRequired={true}
    />
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Phone Number"
      descriptiveText={
        <Text as="span" fontSize="0.8rem" color="red" fontStyle="italic">
          Required
        </Text>
      }
      isRequired={true}
    />
    <Button type="submit">Submit</Button>
  </Flex>
);
