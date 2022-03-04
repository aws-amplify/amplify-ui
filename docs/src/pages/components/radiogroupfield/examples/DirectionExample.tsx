import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const DirectionExample = () => (
  <>
    <RadioGroupField
      label="Language"
      name="example-7"
      defaultValue="html"
      labelHidden
    >
      <Radio value="html">html</Radio>
      <Radio value="css">css</Radio>
      <Radio value="javascript">javascript</Radio>
    </RadioGroupField>
    <RadioGroupField
      label="Language"
      name="example-8"
      defaultValue="html"
      direction="row"
      labelHidden
    >
      <Radio value="html">html</Radio>
      <Radio value="css">css</Radio>
      <Radio value="javascript">javascript</Radio>
    </RadioGroupField>
  </>
);
