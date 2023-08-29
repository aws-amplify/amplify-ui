import { Card, Flex, Fieldset, TextField } from '@aws-amplify/ui-react';

export const FormAttribute = () => {
  return (
    <Flex direction="column">
      <Card variation="elevated" as="form" id="testForm">
        This is a Card output as a form.
      </Card>
      <Fieldset legend="Listed fieldset" form="testForm">
        <TextField label="Listed input" form="testForm" />
      </Fieldset>
    </Flex>
  );
};
