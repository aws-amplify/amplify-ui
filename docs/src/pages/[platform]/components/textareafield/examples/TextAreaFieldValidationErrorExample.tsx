import { Flex, TextAreaField } from '@aws-amplify/ui-react';

export const TextAreaFieldValidationErrorExample = () => {
  return (
    <Flex gap="1rem" direction="column">
      <TextAreaField
        label="Comments"
        hasError={true}
        errorMessage="Please enter a comment"
      />
    </Flex>
  );
};
