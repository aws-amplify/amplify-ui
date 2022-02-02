import { Flex, TextField } from '@aws-amplify/ui-react';

export const TextFieldStatesExample = () => {
  return (
    <Flex direction="column" gap="1rem">
      <TextField label="Disabled" defaultValue="Disabled" isDisabled={true} />
      <TextField
        label="Readonly"
        defaultValue="You can't edit me!"
        isReadOnly={true}
      />
    </Flex>
  );
};
