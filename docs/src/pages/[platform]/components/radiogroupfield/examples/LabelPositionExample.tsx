import { Radio, RadioGroupField, Flex } from '@aws-amplify/ui-react';

export const LabelPositionExample = () => (
  <Flex>
    <RadioGroupField label="Default" name="default" labelHidden>
      <Radio value="default">Default</Radio>
    </RadioGroupField>

    <RadioGroupField
      label="Start"
      name="start"
      labelPosition="start"
      labelHidden
    >
      <Radio value="start">Start</Radio>
    </RadioGroupField>

    <RadioGroupField label="Top" name="top" labelPosition="top" labelHidden>
      <Radio value="top">Top</Radio>
    </RadioGroupField>

    <RadioGroupField
      label="Bottom"
      name="bottom"
      labelPosition="bottom"
      labelHidden
    >
      <Radio value="bottom">Bottom</Radio>
    </RadioGroupField>
  </Flex>
);
