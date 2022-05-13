import { IconArrowDropDown, SelectField } from '@aws-amplify/ui-react';

export const SelectFieldIconExample = () => (
  <SelectField
    label="Icon example"
    labelHidden
    icon={<IconArrowDropDown />}
    iconColor="red"
    placeholder="Check out that Icon! ---> "
  >
    <option value="cool">Pretty cool, right?</option>
  </SelectField>
);
