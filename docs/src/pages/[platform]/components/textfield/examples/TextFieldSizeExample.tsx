import { Flex, TextField } from '@aws-amplify/ui-react';

export const TextFieldSizeExample = () => {
  return (
    <Flex direction="column">
      <TextField label="Small" size="small" width="50%" />
      <TextField label="Default" width="75%" />
      <TextField label="Large" size="large" width="100%" />
    </Flex>
  );
};
