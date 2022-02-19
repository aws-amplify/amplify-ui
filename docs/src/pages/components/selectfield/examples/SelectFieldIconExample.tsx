import { SelectField } from '@aws-amplify/ui-react';
import { HiArrowNarrowDown } from 'react-icons/hi';

export const SelectFieldIconExample = () => (
  <SelectField
    label="Icon example"
    labelHidden
    icon={<HiArrowNarrowDown />}
    iconColor="red"
    placeholder="Check out that Icon! ---> "
  >
    <option value="cool">Pretty cool, right?</option>
  </SelectField>
);
