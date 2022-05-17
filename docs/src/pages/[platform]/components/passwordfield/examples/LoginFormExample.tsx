import {
  Button,
  Flex,
  Heading,
  PasswordField,
  TextField,
  useTheme,
} from '@aws-amplify/ui-react';

export const LoginFormExample = () => {
  const { tokens } = useTheme();
  return (
    <Flex as="form" direction="column" gap={tokens.space.medium}>
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
};
