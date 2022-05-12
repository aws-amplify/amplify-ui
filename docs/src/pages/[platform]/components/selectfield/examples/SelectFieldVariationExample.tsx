import { SelectField, Flex } from '@aws-amplify/ui-react';

export const SelectFieldVariationExample = () => (
  <Flex direction="column">
    <SelectField label="default" labelHidden>
      <option>default</option>
    </SelectField>
    <SelectField variation="quiet" label="quiet" labelHidden>
      <option>quiet</option>
    </SelectField>
  </Flex>
);
