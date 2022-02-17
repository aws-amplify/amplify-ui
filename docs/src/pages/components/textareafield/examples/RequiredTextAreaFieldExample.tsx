import { Button, Flex, Text, TextAreaField } from '@aws-amplify/ui-react';

export const RequiredTextAreaFieldExample = () => {
  return (
    <Flex as="form" direction="column" width="20rem">
      <TextAreaField
        label={
          <Text>
            Essay Question #1
            <Text
              as="span"
              fontSize="var(--amplify-font-sizes-small)"
              color="var(--amplify-colors-font-error)"
            >
              {' '}
              (required)
            </Text>
          </Text>
        }
        isRequired={true}
      />
      <TextAreaField
        label="Essay Question #1"
        descriptiveText={
          <Text
            as="span"
            fontSize="var(--amplify-font-sizes-small)"
            color="var(--amplify-colors-font-error)"
            fontStyle="italic"
          >
            Required
          </Text>
        }
        isRequired={true}
      />
      <Button type="submit">Submit</Button>
    </Flex>
  );
};
