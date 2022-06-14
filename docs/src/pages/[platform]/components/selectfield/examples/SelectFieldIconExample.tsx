import { Icon, SelectField } from '@aws-amplify/ui-react';

const IconArrowDropDown = () => {
  return <Icon pathData="M7 10L12 15L17 10H7Z" ariaLabel="Down arrow" />;
};

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
