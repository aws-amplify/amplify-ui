import { PasswordField, Text } from '@aws-amplify/ui-react';

export const PasswordFieldDescriptiveTextExample = () => (
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
