import { Button, Flex, TextAreaField } from '@aws-amplify/ui-react';

export const DefaultRequiredTextAreaFieldExample = () => {
  return (
    <Flex as="form" direction="column">
      <TextAreaField label="Essay question #1" isRequired={true} />
      <Button type="submit">Submit</Button>
    </Flex>
  );
};
