import { Button, Flex, Text, TextField } from '@aws-amplify/ui-react';

export const RequiredTextFieldExample = () => {
  return (
    <Flex as="form" direction="column" width="20rem">
      <TextField
        label={
          <Text>
            Email
            <Text as="span" fontSize="0.8rem" color="red">
              {' '}
              (required)
            </Text>
          </Text>
        }
        type="email"
        isRequired={true}
      />
      <TextField
        label="Password"
        type="password"
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
};
