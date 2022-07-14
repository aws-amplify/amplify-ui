import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const DisabledExample = () => (
  <>
    <RadioGroupField label="Disabled Radio" name="disabled-radio">
      <Radio value="option-1">Option 1</Radio>
      <Radio value="option-2" isDisabled>
        Option 2 is disabled
      </Radio>
      <Radio value="option-3">Option 3</Radio>
    </RadioGroupField>

    <RadioGroupField
      label="Disabled RadioGroupField"
      name="disabled-field"
      isDisabled
    >
      <Radio value="all">All</Radio>
      <Radio value="options">Options</Radio>
      <Radio value="disabled">Disabled</Radio>
    </RadioGroupField>
  </>
);
