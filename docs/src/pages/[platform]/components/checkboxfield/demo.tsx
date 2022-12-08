import * as React from 'react';
import { CheckboxField, CheckboxFieldProps, Flex } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { CheckboxFieldPropControls } from './CheckboxFieldPropControls';
import { useCheckboxFieldProps } from './useCheckboxFieldProps';
import { demoState } from '@/utils/demoState';

const propsToCode = ({
  label,
  labelPosition,
  size,
  isDisabled,
  isIndeterminate,
}: CheckboxFieldProps) => {
  return (
    `<CheckboxField` +
    (label ? `\n  label=${JSON.stringify(label)}` : '') +
    `\n  name="subscribe"` +
    `\n  value="yes"` +
    (isDisabled ? `\n  isDisabled={${isDisabled}}` : '') +
    (isIndeterminate ? `\n  isIndeterminate={${isIndeterminate}}` : '') +
    (labelPosition
      ? `\n  labelPosition=${JSON.stringify(labelPosition)}`
      : '') +
    (size ? `\n  size=${JSON.stringify(size)}` : '') +
    `\n/>`
  );
};

const defaultCheckboxFieldProps = {
  label: 'Subscribe',
  name: 'subscribe',
  value: 'yes',
};

export const CheckboxDemo = () => {
  const props = useCheckboxFieldProps(
    (demoState.get(CheckboxField.displayName) as CheckboxFieldProps) ||
      defaultCheckboxFieldProps
  );

  return (
    <Demo
      code={propsToCode(props)}
      propControls={<CheckboxFieldPropControls {...props} />}
    >
      <CheckboxField
        name={props.name}
        value={props.value}
        isDisabled={props.isDisabled}
        isIndeterminate={props.isIndeterminate}
        size={props.size}
        label={props.label}
        labelPosition={props.labelPosition}
      />
    </Demo>
  );
};
