import React, { useState } from 'react';

import { CheckboxField, Flex } from '@aws-amplify/ui-react';

import { CheckboxFieldPropControls } from '@/components/CheckboxFieldPropControls';
import { useCheckboxFieldProps } from '@/components/useCheckboxFieldProps';

export const Demo: React.FC = () => {
  const props = useCheckboxFieldProps({
    label: 'subscribe',
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
        isEmphasized={props.isEmphasized}
        size={props.size}
      >
        {props.label}
      </CheckboxField>
    </Flex>
  );
};

export const ControlledCheckbox: React.FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxField
      name="subscribe-controlled"
      value="yes"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      subscribe
    </CheckboxField>
  );
};
