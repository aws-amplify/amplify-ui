import * as React from 'react';

import {
  Button,
  Flex,
  Heading,
  PasswordField,
  Text,
  TextField,
} from '@aws-amplify/ui-react';

export const LoginFormExample = () => (
  <Flex as="form" direction="column" gap="1rem">
    <Heading level={3}>Login</Heading>
    <TextField label="Username" name="username" autoComplete="username" />
    <PasswordField
      label="Password"
      name="password"
      autoComplete="current-password"
    />
    <Button type="submit" onClick={(e) => e.preventDefault()}>
      Login
    </Button>
  </Flex>
);

export const SignUpFormExample = () => (
  <Flex as="form" direction="column" gap="1rem">
    <Heading level={3}>Sign Up</Heading>
    <TextField label="Username" name="username" autoComplete="username" />
    <PasswordField
      label="Password"
      name="password"
      autoComplete="new-password"
      descriptiveText="Password must be at least 8 characters"
    />
    <Button type="submit" onClick={(e) => e.preventDefault()}>
      Sign Up
    </Button>
  </Flex>
);

export const ChangePasswordFormExample = () => (
  <Flex as="form" direction="column" gap="1rem">
    <Heading level={3}>Change Password</Heading>
    <TextField label="Username" name="username" autoComplete="username" />
    <PasswordField
      label="Current password"
      name="current_password"
      autoComplete="current-password"
      descriptiveText="Password must be at least 8 characters"
    />
    <PasswordField
      label="New password"
      name="new_password"
      autoComplete="new-password"
      descriptiveText="Password must be at least 8 characters"
    />
    <PasswordField
      label="Confirm password"
      name="confirm_password"
      autoComplete="new-password"
    />
    <Button type="submit" onClick={(e) => e.preventDefault()}>
      Submit
    </Button>
  </Flex>
);

export const DescriptiveTextExample = () => (
  <PasswordField
    label="Password"
    name="password"
    descriptiveText={
      <Text
        as="span"
        color="rebeccapurple"
        fontStyle="italic"
        fontSize="0.8rem"
      >
        Password length must be greater than 8 characters
      </Text>
    }
  />
);

export const RequiredPasswordFieldExample = () => (
  <Flex as="form" direction="column" width="20rem">
    <PasswordField
      label={
        <Text>
          Password
          <Text as="span" fontSize="0.8rem" color="red">
            {' '}
            (required)
          </Text>
        </Text>
      }
      name="password"
      isRequired={true}
    />
    <PasswordField
      label="Password"
      descriptiveText={
        <Text as="span" fontSize="0.8rem" color="red" fontStyle="italic">
          Required
        </Text>
      }
      name="password"
      isRequired={true}
    />
    <Button type="submit">Submit</Button>
  </Flex>
);

export const PasswordFieldStyledPropsExample = () => (
  <PasswordField
    direction="row"
    alignItems="baseline"
    fontSize="1.5rem"
    label={
      <Text fontWeight="bold" fontSize="1.5rem">
        Name:
      </Text>
    }
    backgroundColor="#fff1e7"
    color="#000"
    width="400px"
  />
);
