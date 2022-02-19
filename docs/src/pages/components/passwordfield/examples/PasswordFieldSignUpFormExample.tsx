import {
  Flex,
  Heading,
  TextField,
  PasswordField,
  Button,
} from '@aws-amplify/ui-react';

export const PasswordFieldSignUpFormExample = () => (
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
