import { Flex, TextField } from '@aws-amplify/ui-react';

export const TextFieldSizeExample = () => {
  return (
    <Flex direction="column">
      <TextField label="Small" size="small" width="10rem" />
      <TextField label="Default" width="20rem" />
      <TextField label="Large" size="large" width="30rem" />
    </Flex>
  );
};
