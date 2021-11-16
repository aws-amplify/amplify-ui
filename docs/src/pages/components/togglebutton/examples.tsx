import * as React from 'react';

import {
  IconFormatAlignCenter,
  IconFormatAlignJustify,
  IconFormatAlignLeft,
  IconFormatAlignRight,
  IconFormatBold,
  IconFormatColorReset,
  IconFormatItalic,
  IconFormatUnderlined,
  ToggleButton,
  ToggleButtonGroup,
} from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';

export const ControlledToggleButton = () => {
  const [isPressed, setIsPressed] = React.useState(false);
  return (
    <ToggleButton
      isPressed={isPressed}
      onChange={() => setIsPressed(!isPressed)}
    >
      Press me!
    </ToggleButton>
  );
};

export const MultipleSelectionDemo = () => {
  const [multipleValue, setMultipleValue] = React.useState([
    'bold',
    'italic',
    'underlined',
  ]);
  return (
    <Example>
      <ToggleButtonGroup
        value={multipleValue}
        onChange={(value: string[]) => setMultipleValue(value)}
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
          <IconFormatColorReset />
        </ToggleButton>
      </ToggleButtonGroup>
    </Example>
  );
};

export const ExclusiveSelectionDemo = () => {
  const [exclusiveValue, setExclusiveValue] = React.useState('align-left');
  return (
    <Example>
      <ToggleButtonGroup
        value={exclusiveValue}
        isExclusive
        onChange={(value: string) => setExclusiveValue(value)}
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
