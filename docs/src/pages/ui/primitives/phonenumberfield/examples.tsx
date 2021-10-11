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

export const AccessibilityExample = () => (
  <Flex>
    <PhoneNumberField
      label="Phone Number"
      labelHidden={true}
      defaultCountryCode="+1"
    />
  </Flex>
);

export const SizeExample = () => (
  <Flex direction="column" gap="1rem">
    <Flex>
      <PhoneNumberField defaultCountryCode="+1" label="Small" size="small" />
      <Button size="small">Small</Button>
    </Flex>
    <Flex>
      <PhoneNumberField defaultCountryCode="+1" label="Default" />
      <Button>Default</Button>
    </Flex>
    <Flex>
      <PhoneNumberField defaultCountryCode="+1" label="Large" size="large" />
      <Button size="large">Large</Button>
    </Flex>
  </Flex>
);

export const DescriptiveTextExample = () => (
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

export const RequiredExample = () => (
  <Flex as="form" direction="column">
    <PhoneNumberField
      defaultCountryCode="+1"
      label="PhoneNumberField"
      isRequired={true}
    />
    <Button type="submit">Submit</Button>
  </Flex>
);

export const StyledRequiredExample = () => (
  <Flex as="form" direction="column">
    <PhoneNumberField
      defaultCountryCode="+1"
      label={
        <Text>
          Phone Number
          <Text as="span" fontSize="0.8rem" color="red">
            {' '}
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

export const ErrorExample = () => (
  <Flex gap="1rem" direction="column">
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Phone Number"
      defaultValue="1234"
      hasError={true}
      errorMessage="Not a valid phone number! 😱"
    />
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Password"
      defaultValue="1234"
      hasError={true}
      variation="quiet"
      errorMessage="Not a valid phone number! 😱"
    />
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
