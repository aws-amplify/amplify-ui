import { Flex, PasswordField, Text, Button } from '@aws-amplify/ui-react';

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
