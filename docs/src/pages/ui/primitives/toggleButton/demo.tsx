import React, { useState } from 'react';

import { Flex, ToggleButton, ToggleButtonGroup } from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { ToggleButtonPropControls } from '@/components/ToggleButtonPropControls';
import { useToggleButtonProps } from '@/components/useToggleButtonProps';
export const Demo = () => {
  const props = useToggleButtonProps({
    isDisabled: false,
    size: 'medium',
    variation: 'default',
  });
  return (
    <Flex direction="column">
      <ToggleButtonPropControls {...props} />
      <Example>
        <ToggleButton
          isDisabled={props.isDisabled}
          size={props.size}
          variation={props.variation}
        >
          Press me!
        </ToggleButton>
      </Example>
    </Flex>
  );
};

export const ControlledToggleButton = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <ToggleButton
      isSelected={isSelected}
      onChange={() => setIsSelected(!isSelected)}
      isDisabled
    >
      demo
    </ToggleButton>
  );
};

export const ToggleButtonGroupDemo = () => {
  const [multipleValue, setMultipleValue] = useState(['1', '2', '3']);
  const [exclusiveValue, setExclusiveValue] = useState('1');
  return (
    <Example>
      <p>Multiple</p>
      <ToggleButtonGroup
        variation="primary"
        value={multipleValue}
        onChange={(e, value: string[]) => setMultipleValue(value)}
      >
        <ToggleButton value="1">1</ToggleButton>
        <ToggleButton value="2">2</ToggleButton>
        <ToggleButton value="3">3</ToggleButton>
        <ToggleButton value="4">4</ToggleButton>
        <ToggleButton value="5">5</ToggleButton>
      </ToggleButtonGroup>
      <p>Exclusive</p>
      <ToggleButtonGroup
        variation="primary"
        value={exclusiveValue}
        isExclusive
        onChange={(e, value: string) => setExclusiveValue(value)}
      >
        <ToggleButton value="1">1</ToggleButton>
        <ToggleButton value="2">2</ToggleButton>
        <ToggleButton value="3">3</ToggleButton>
        <ToggleButton value="4">4</ToggleButton>
        <ToggleButton value="5">5</ToggleButton>
      </ToggleButtonGroup>
    </Example>
  );
};
