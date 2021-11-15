import { CheckboxField, Flex } from '@aws-amplify/ui-react';

import { CheckboxFieldPropControls } from '@/components/CheckboxFieldPropControls';
import { useCheckboxFieldProps } from '@/components/useCheckboxFieldProps';

export const Demo = () => {
  const props = useCheckboxFieldProps({
    label: 'Subscribe',
    name: 'subscribe',
    value: 'yes',
  });
  return (
    <Flex direction="column">
      <CheckboxFieldPropControls {...props} />
      <CheckboxField
        name={props.name}
        value={props.value}
        isDisabled={props.isDisabled}
        size={props.size}
        label={props.label}
        labelHidden={props.labelHidden}
      />
    </Flex>
  );
};
