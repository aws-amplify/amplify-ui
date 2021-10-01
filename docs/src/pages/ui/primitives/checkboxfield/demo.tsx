import React, { useState } from 'react';

import { CheckboxField, Flex } from '@aws-amplify/ui-react';

import { CheckboxFieldPropControls } from '@/components/CheckboxFieldPropControls';
import { useCheckboxFieldProps } from '@/components/useCheckboxFieldProps';

export const Demo: React.FC = () => {
  const label = 'Subscribe';
  const props = useCheckboxFieldProps({
    label,
    children: label,
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
      >
        {props.label}
      </CheckboxField>
    </Flex>
  );
};
