import {
  Flex,
  Heading,
  PhoneNumberField,
  PasswordField,
  Button,
} from '@aws-amplify/ui-react';

export const PhoneNumberFieldAutoCompleteExample = () => (
  <Flex as="form" direction="column" gap="1rem">
    <Heading level={3}>Sign In</Heading>
    <PhoneNumberField
      autoComplete="username"
      label="Phone Number"
      defaultCountryCode="+1"
    />
    <PasswordField label="Password" />
    <Button type="submit" onClick={(e) => e.preventDefault()}>
      Sign In
    </Button>
  </Flex>
);
