import { SelectField, Flex } from '@aws-amplify/ui-react';

export const SelectFieldSizeExample = () => (
  <Flex direction="column">
    <SelectField size="small" label="small" labelHidden>
      <option>small</option>
    </SelectField>
    <SelectField label="default" labelHidden>
      <option>default</option>
    </SelectField>
    <SelectField size="large" label="large" labelHidden>
      <option>large</option>
    </SelectField>
  </Flex>
);
