import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const DisabledExample = () => (
  <>
    <RadioGroupField label="Language" name="example-9" defaultValue="html">
      <Radio value="html">html</Radio>
      {/* Only disabling one option */}
      <Radio value="css" isDisabled>
        css
      </Radio>
      <Radio value="javascript">javascript</Radio>
    </RadioGroupField>
    {/* Disabling the whole group */}
    <RadioGroupField
      label="Language"
      name="example-10"
      defaultValue="html"
      isDisabled
    >
      <Radio value="html">html</Radio>
      <Radio value="css">css</Radio>
      <Radio value="javascript">javascript</Radio>
    </RadioGroupField>
  </>
);
