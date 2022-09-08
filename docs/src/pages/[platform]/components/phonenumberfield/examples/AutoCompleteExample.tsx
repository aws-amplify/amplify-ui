import { Flex, PhoneNumberField, Button } from '@aws-amplify/ui-react';

export const AutoCompleteExample = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Phone number submitted with form: ${event.target.phone_number.value}`
    );
  };

  return (
    <Flex as="form" direction="column" gap="1rem" onSubmit={handleSubmit}>
      <PhoneNumberField
        autoComplete="username"
        label="Phone Number"
        name="phone_number"
        defaultDialCode="+1"
      />
      <Button type="submit">Sign In</Button>
    </Flex>
  );
};
