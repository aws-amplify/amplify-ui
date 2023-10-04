import * as React from 'react';
import {
  Radio,
  RadioGroupField,
  RadioGroupFieldProps,
} from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { RadioGroupFieldPropControls } from './RadioGroupFieldPropControls';
import { useRadioGroupFieldProps } from './useRadioGroupFieldProps';
import { demoState } from '@/utils/demoState';
import { getPropString } from '../utils/getPropString';

const propsToCode = ({
  legend,
  labelPosition,
  variation,
  size,
  direction,
  name,
  isDisabled,
}: RadioGroupFieldProps) => {
  return (
    `<RadioGroupField` +
    getPropString(legend, 'legend') +
    getPropString(name, 'name') +
    getPropString(labelPosition, 'labelPosition') +
    getPropString(variation, 'variation') +
    (direction === 'row' ? `\n  direction=${JSON.stringify(direction)}` : '') +
    getPropString(size, 'size') +
    (isDisabled ? `\n  isDisabled={${isDisabled}}` : '') +
    `\n>` +
    `\n  <Radio value="HTML">HTML</Radio>` +
    `\n  <Radio value="CSS">CSS</Radio>` +
    `\n  <Radio value="JavaScript">JavaScript</Radio>` +
    `\n</RadioGroupField>`
  );
};

const defaultRadioGroupFieldProps = {
  legend: 'Language',
  name: 'language',
  defaultValue: 'HTML',
};

export const RadioGroupFieldDemo = () => {
  const props = useRadioGroupFieldProps(
    (demoState.get(RadioGroupField.displayName) as RadioGroupFieldProps) ||
      defaultRadioGroupFieldProps
  );

  return (
    <Demo
      code={propsToCode(props)}
      propControls={<RadioGroupFieldPropControls {...props} />}
    >
      <RadioGroupField
        name={props.name}
        legend={props.legend}
        defaultValue={props.defaultValue}
        variation={props.variation}
        labelPosition={props.labelPosition}
        isDisabled={props.isDisabled}
        direction={props.direction}
        size={props.size}
      >
        <Radio value="HTML">HTML</Radio>
        <Radio value="CSS">CSS</Radio>
        <Radio value="JavaScript">JavaScript</Radio>
      </RadioGroupField>
    </Demo>
  );
};
