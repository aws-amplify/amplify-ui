import { Flex, TextAreaField } from '@aws-amplify/ui-react';

export const TextAreaFieldStatesExample = () => {
  return (
    <Flex direction="column" gap="1rem">
      <TextAreaField
        label="Disabled"
        defaultValue="Disabled"
        isDisabled={true}
      />
      <TextAreaField
        label="Readonly"
        defaultValue="You can't edit me!"
        isReadOnly={true}
      />
    </Flex>
  );
};
