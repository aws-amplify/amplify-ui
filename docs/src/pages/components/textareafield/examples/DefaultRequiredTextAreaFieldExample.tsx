import { Button, Flex, TextAreaField } from '@aws-amplify/ui-react';

export const DefaultRequiredTextAreaFieldExample = () => {
  return (
    <Flex as="form" direction="column" width="20rem">
      <TextAreaField label="Email" isRequired={true} />
      <Button type="submit">Submit</Button>
    </Flex>
  );
};
