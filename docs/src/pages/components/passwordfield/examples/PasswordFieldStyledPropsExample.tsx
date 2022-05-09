import { PasswordField, Text } from '@aws-amplify/ui-react';

export const PasswordFieldStyledPropsExample = () => (
  <PasswordField
    direction="row"
    alignItems="baseline"
    label={
      <Text fontWeight="bold" fontSize="1.5rem">
        Password:
      </Text>
    }
    fontSize="1.5rem"
    backgroundColor="#fff1e7"
    color="#000"
    width="400px"
  />
);
