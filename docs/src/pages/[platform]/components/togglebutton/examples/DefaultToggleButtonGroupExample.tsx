import * as React from 'react';
import {
  MdFormatBold,
  MdFormatColorFill,
  MdFormatItalic,
  MdFormatUnderlined,
} from 'react-icons/md';
import { ToggleButton, ToggleButtonGroup } from '@aws-amplify/ui-react';

export const DefaultToggleButtonGroupExample = () => {
  const [multipleValue, setMultipleValue] = React.useState(['bold']);
  return (
    <ToggleButtonGroup
      value={multipleValue}
      onChange={(value) => setMultipleValue(value as string[])}
    >
      <ToggleButton value="bold">
        <MdFormatBold />
      </ToggleButton>
      <ToggleButton value="italic">
        <MdFormatItalic />
      </ToggleButton>
      <ToggleButton value="underlined">
        <MdFormatUnderlined />
      </ToggleButton>
      <ToggleButton value="color-fill">
        <MdFormatColorFill />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
