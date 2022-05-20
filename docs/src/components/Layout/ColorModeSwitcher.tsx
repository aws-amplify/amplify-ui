import {
  ToggleButton,
  ToggleButtonGroup,
  VisuallyHidden,
  ColorMode,
} from '@aws-amplify/ui-react';
import { MdWbSunny, MdBedtime, MdTonality } from 'react-icons/md';

export const ColorModeSwitcher = ({ colorMode, setColorMode }) => {
  return (
    <ToggleButtonGroup
      value={colorMode}
      size="small"
      onChange={(value: ColorMode) => setColorMode(value)}
      isExclusive
      isSelectionRequired
      className="color-switcher"
    >
      <ToggleButton value="light" title="Light mode">
        <VisuallyHidden>Light mode</VisuallyHidden>
        <MdWbSunny style={{ height: '1.5rem' }} />
      </ToggleButton>
      <ToggleButton value="dark" title="Dark mode">
        <VisuallyHidden>Dark mode</VisuallyHidden>
        <MdBedtime style={{ height: '1.5rem' }} />
      </ToggleButton>
      <ToggleButton value="system" title="System preferences">
        <VisuallyHidden>System preference</VisuallyHidden>
        <MdTonality style={{ height: '1.5rem' }} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
