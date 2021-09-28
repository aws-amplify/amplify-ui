import React, { useState } from 'react';

import {
  Flex,
  IconFormatAlignCenter,
  IconFormatAlignJustify,
  IconFormatAlignLeft,
  IconFormatAlignRight,
  IconFormatBold,
  IconFormatColorFill,
  IconFormatItalic,
  IconFormatUnderlined,
  ToggleButton,
  ToggleButtonGroup,
} from '@aws-amplify/ui-react';

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
    >
      Press me!
    </ToggleButton>
  );
};

export const MultipleSelectionDemo = () => {
  const [multipleValue, setMultipleValue] = useState([
    'bold',
    'italic',
    'underlined',
  ]);
  return (
    <Example>
      <ToggleButtonGroup
        value={multipleValue}
        onChange={(e, value: string[]) => setMultipleValue(value)}
      >
        <ToggleButton value="bold">
          <IconFormatBold />
        </ToggleButton>
        <ToggleButton value="italic">
          <IconFormatItalic />
        </ToggleButton>
        <ToggleButton value="underlined">
          <IconFormatUnderlined />
        </ToggleButton>
        <ToggleButton value="color-fill">
          <IconFormatColorFill />
        </ToggleButton>
      </ToggleButtonGroup>
    </Example>
  );
};

export const ExclusiveSelectionDemo = () => {
  const [exclusiveValue, setExclusiveValue] = useState('align-left');
  return (
    <Example>
      <ToggleButtonGroup
        value={exclusiveValue}
        isExclusive
        onChange={(e, value: string) => setExclusiveValue(value)}
      >
        <ToggleButton value="align-left">
          <IconFormatAlignLeft />
        </ToggleButton>
        <ToggleButton value="align-center">
          <IconFormatAlignCenter />
        </ToggleButton>
        <ToggleButton value="align-right">
          <IconFormatAlignRight />
        </ToggleButton>
        <ToggleButton value="align-justify">
          <IconFormatAlignJustify />
        </ToggleButton>
      </ToggleButtonGroup>
    </Example>
  );
};
