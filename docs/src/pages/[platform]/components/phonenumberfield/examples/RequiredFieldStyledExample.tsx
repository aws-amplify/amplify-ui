import { PhoneNumberField, Flex, Button, Text } from '@aws-amplify/ui-react';

export const RequiredFieldStyledExample = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Primary phone number: ${event.target.primary_phone.value} \nSecondary phone number: ${event.target.secondary_phone.value}`
    );
  };

  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit}>
      <PhoneNumberField
        defaultDialCode="+1"
        label="Primary phone number"
        name="primary_phone"
        descriptiveText={
          <Text as="span" fontSize="0.8rem" color="red" fontStyle="italic">
            Required
          </Text>
        }
        isRequired={true}
      />
      <PhoneNumberField
        defaultDialCode="+1"
        label={
          <Text>
            Secondary phone number
            <Text as="span" fontSize="0.8rem" color="red" padding="0.25rem">
              (required)
            </Text>
          </Text>
        }
        name="secondary_phone"
        isRequired={true}
      />
      <Button type="submit">Submit</Button>
    </Flex>
  );
};
