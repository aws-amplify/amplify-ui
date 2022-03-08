import * as React from 'react';
import {
  Radio,
  RadioGroupField,
  RadioGroupFieldProps,
} from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { RadioGroupFieldPropControls } from './RadioGroupFieldPropControls';
import { useRadioGroupFieldProps } from './useRadioGroupFieldProps';

const propsToCode = ({
  label,
  labelPosition,
  size,
  direction,
  name,
  isDisabled,
}: RadioGroupFieldProps) => {
  return (
    `<RadioGroupField` +
    (label ? `\n  label=${JSON.stringify(label)}` : '') +
    (name ? `\n  name=${JSON.stringify(name)}` : '') +
    (isDisabled ? `\n  isDisabled={${isDisabled}}` : '') +
    (labelPosition
      ? `\n  labelPosition=${JSON.stringify(labelPosition)}`
      : '') +
    (direction ? `\n  direction=${JSON.stringify(direction)}` : '') +
    (size ? `\n  size=${JSON.stringify(size)}` : '') +
    `\n>` +
    `\n  <Radio value="html">html</Radio>` +
    `\n  <Radio value="css">css</Radio>` +
    `\n  <Radio value="javascript">javascript</Radio>` +
    `\n</RadioGroupField>`
  );
};

export const RadioGroupFieldDemo = () => {
  const props = useRadioGroupFieldProps({
    label: 'Language',
    name: 'language',
    defaultValue: 'html',
  });

  return (
    <Demo
      code={propsToCode(props)}
      propControls={<RadioGroupFieldPropControls {...props} />}
    >
      <RadioGroupField
        name={props.name}
        label={props.label}
        defaultValue={props.defaultValue}
        labelPosition={props.labelPosition}
        isDisabled={props.isDisabled}
        direction={props.direction}
        size={props.size}
      >
        <Radio value="html">html</Radio>
        <Radio value="css">css</Radio>
        <Radio value="javascript">javascript</Radio>
      </RadioGroupField>
    </Demo>
  );
};
