import { Radio, RadioGroupField, Flex } from '@aws-amplify/ui-react';

export const LabelPositionExample = () => (
  <Flex direction="row">
    <RadioGroupField label="Language" name="language3" defaultValue="html">
      <Radio value="html">html</Radio>
      <Radio value="css">css</Radio>
      <Radio value="javascript">javascript</Radio>
    </RadioGroupField>

    <RadioGroupField
      label="Language"
      name="language4"
      defaultValue="html"
      labelPosition="start"
    >
      <Radio value="html">html</Radio>
      <Radio value="css">css</Radio>
      <Radio value="javascript">javascript</Radio>
    </RadioGroupField>

    <RadioGroupField
      label="Language"
      name="language5"
      defaultValue="html"
      labelPosition="start"
    >
      <Radio value="html">html</Radio>
      <Radio value="css" labelPosition="end">
        css
      </Radio>
      <Radio value="javascript">javascript</Radio>
    </RadioGroupField>
  </Flex>
);
