import { Fieldset, Text, TextField } from '@aws-amplify/ui-react';

export const DisabledFieldset = () => {
  return (
    <Fieldset legend="Disabled Fieldset" isDisabled={true}>
      <Text fontStyle="italic" variation="tertiary">
        The input in this fieldset is disabled because of the parent fieldset.
      </Text>
      <TextField label="Test input" />
      <Fieldset legend="Nested fieldset">
        <Text fontStyle="italic" variation="tertiary">
          This input is also disabled because the fieldset above it is disabled,
          even though its immediate parent fieldset is not disabled.
        </Text>
        <TextField label="Test nested input" />
      </Fieldset>
    </Fieldset>
  );
};
