import {
  Flex,
  Heading,
  TextField,
  PasswordField,
  Button,
} from '@aws-amplify/ui-react';

export const PasswordFieldLoginFormExample = () => (
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
