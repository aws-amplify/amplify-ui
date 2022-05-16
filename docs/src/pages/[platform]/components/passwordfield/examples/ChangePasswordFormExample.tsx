import {
  Flex,
  Heading,
  TextField,
  PasswordField,
  Button,
  useTheme,
} from '@aws-amplify/ui-react';

export const ChangePasswordFormExample = () => {
  const { tokens } = useTheme();
  return (
    <Flex as="form" direction="column" gap={tokens.space.medium}>
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
};
