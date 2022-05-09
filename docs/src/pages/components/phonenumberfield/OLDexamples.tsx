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

export const CountryCodePropsExample = () => (
  <Flex direction="column">
    <PhoneNumberField
      label="Phone Number"
      defaultCountryCode="+7"
      countryCodeName="country_code"
      countryCodeLabel="Country Code"
      onCountryCodeChange={(e) => console.log(e.target.value)}
    />
  </Flex>
);

export const StatesExample = () => (
  <Flex direction="column" gap="1rem">
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Disabled"
      isDisabled={true}
      descriptiveText="You can't submit me"
    />
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Readonly"
      isReadOnly={true}
      descriptiveText="You can't edit me"
    />
  </Flex>
);

export const StyledRequiredExample = () => (
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
