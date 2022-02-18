import { SelectField } from '@aws-amplify/ui-react';

export const SelectFieldDisabledStateExample = () => (
  <SelectField isDisabled label="SelectField" labelHidden>
    <option value="option">You cannot view or select this option</option>
  </SelectField>
);
