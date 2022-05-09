import * as React from 'react';

import {
  Button,
  Flex,
  Heading,
  PasswordField,
  PhoneNumberField,
  Text,
  View,
} from '@aws-amplify/ui-react';

export const AutoCompleteExample = () => (
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

export const LocalStylingExample = () => (
  <PhoneNumberField
    direction="row"
    alignItems="baseline"
    defaultCountryCode="+1"
    label={
      <Text fontWeight="bold" fontSize="1.5rem">
        Phone Number:
      </Text>
    }
    fontSize="1.5rem"
    backgroundColor="#fff1e7"
    color="#000"
  />
);
