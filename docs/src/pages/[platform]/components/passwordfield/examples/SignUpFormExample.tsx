import {
  Flex,
  Heading,
  TextField,
  PasswordField,
  Button,
  useTheme,
} from '@aws-amplify/ui-react';

export const SignUpFormExample = () => {
  const { tokens } = useTheme();
  return (
    <Flex as="form" direction="column" gap={tokens.space.medium}>
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
};
