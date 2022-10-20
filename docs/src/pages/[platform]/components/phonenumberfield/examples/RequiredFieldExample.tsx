import { PhoneNumberField, Flex, Button } from '@aws-amplify/ui-react';

export const RequiredFieldExample = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Phone number submitted with form: ${event.target.phone_number.value}`
    );
  };

  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit}>
      <PhoneNumberField
        defaultDialCode="+1"
        label="Phone Number"
        name="phone_number"
        isRequired={true}
      />
      <Button type="submit" width="10rem">
        Submit
      </Button>
    </Flex>
  );
};
