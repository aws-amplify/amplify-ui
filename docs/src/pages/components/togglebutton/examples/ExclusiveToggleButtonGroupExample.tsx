import * as React from 'react';
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
} from 'react-icons/md';
import { ToggleButton, ToggleButtonGroup } from '@aws-amplify/ui-react';

export const ExclusiveToggleButtonGroupExample = () => {
  const [exclusiveValue, setExclusiveValue] = React.useState('align-left');
  return (
    <ToggleButtonGroup
      value={exclusiveValue}
      isExclusive
      onChange={(value) => setExclusiveValue(value as string)}
    >
      <ToggleButton value="align-left">
        <MdFormatAlignLeft />
      </ToggleButton>
      <ToggleButton value="align-center">
        <MdFormatAlignCenter />
      </ToggleButton>
      <ToggleButton value="align-right">
        <MdFormatAlignRight />
      </ToggleButton>
      <ToggleButton value="align-justify">
        <MdFormatAlignJustify />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
