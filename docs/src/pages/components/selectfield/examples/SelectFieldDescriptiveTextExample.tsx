import { SelectField } from '@aws-amplify/ui-react';

export const SelectFieldDescriptiveTextExample = () => (
  <SelectField
    label="SelectField"
    descriptiveText="What do you think of the SelectField?"
  >
    <option value="amazing">It is amazing</option>
    <option value="wow">WOW!</option>
    <option value="incredible">Just incredible</option>
  </SelectField>
);
