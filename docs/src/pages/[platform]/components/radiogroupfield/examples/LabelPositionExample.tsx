import { Radio, RadioGroupField, Flex } from '@aws-amplify/ui-react';

export const LabelPositionExample = () => (
  <Flex>
    <RadioGroupField legend="Default" name="default" legendHidden>
      <Radio value="default">Default</Radio>
    </RadioGroupField>

    <RadioGroupField
      legend="Start"
      name="start"
      labelPosition="start"
      legendHidden
    >
      <Radio value="start">Start</Radio>
    </RadioGroupField>

    <RadioGroupField legend="Top" name="top" labelPosition="top" legendHidden>
      <Radio value="top">Top</Radio>
    </RadioGroupField>

    <RadioGroupField
      legend="Bottom"
      name="bottom"
      labelPosition="bottom"
      legendHidden
    >
      <Radio value="bottom">Bottom</Radio>
    </RadioGroupField>
  </Flex>
);
