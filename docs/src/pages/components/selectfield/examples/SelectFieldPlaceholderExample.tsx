import { SelectField } from '@aws-amplify/ui-react';

export const SelectFieldPlaceholderExample = () => (
  <SelectField
    placeholder="This is the placeholder..."
    label="placeholderExample"
    labelHidden
  >
    <option value="option">This is the option</option>
  </SelectField>
);
