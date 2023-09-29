import { Flex, Fieldset, Text, CheckboxField } from '@aws-amplify/ui-react';

export const FieldsetDirection = () => {
  return (
    <Flex direction="column">
      <Fieldset legend="row" direction="row" variation="outlined">
        <CheckboxField label="Item 1" name="Item 1" />
        <CheckboxField label="Item 2" name="Item 2" />
      </Fieldset>
      <Fieldset
        legend="row-reverse"
        direction="row-reverse"
        variation="outlined"
      >
        <CheckboxField label="Item 3" name="Item 3" />
        <CheckboxField label="Item 4" name="Item 4" />
      </Fieldset>
      <Fieldset legend="column" direction="column" variation="outlined">
        <CheckboxField label="Item 5" name="Item 5" />
        <CheckboxField label="Item 6" name="Item 6" />
      </Fieldset>
      <Fieldset
        legend="column-reverse"
        direction="column-reverse"
        variation="outlined"
      >
        <CheckboxField label="Item 7" name="Item 7" />
        <CheckboxField label="Item 8" name="Item 8" />
      </Fieldset>
    </Flex>
  );
};
