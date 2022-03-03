import { CheckboxField, CheckboxFieldProps, Flex } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { CheckboxFieldPropControls } from './CheckboxFieldPropControls';
import { useCheckboxFieldProps } from './useCheckboxFieldProps';

const propsToCode = ({
  label,
  labelPosition,
  isLabelHidden,
  size,
  isDisabled,
}: CheckboxFieldProps) => {
  return (
    `<CheckboxField` +
    (label ? `\n  label=${JSON.stringify(label)}` : '') +
    (isDisabled ? `\n  isDisabled={${isDisabled}}` : '') +
    (labelPosition
      ? `\n  labelPosition=${JSON.stringify(labelPosition)}`
      : '') +
    (isLabelHidden ? `\n  isLabelHidden={${isLabelHidden}}` : '') +
    (size ? `\n  size=${JSON.stringify(size)}` : '') +
    `\n/>`
  );
};

export const CheckboxDemo = () => {
  const props = useCheckboxFieldProps({
    label: 'Subscribe',
    name: 'subscribe',
    value: 'yes',
  });
  return (
    <Demo
      code={propsToCode(props)}
      propControls={<CheckboxFieldPropControls {...props} />}
    >
      <CheckboxField
        name={props.name}
        value={props.value}
        isDisabled={props.isDisabled}
        size={props.size}
        label={props.label}
        isLabelHidden={props.isLabelHidden}
        labelPosition={props.labelPosition}
      />
    </Demo>
  );
};
