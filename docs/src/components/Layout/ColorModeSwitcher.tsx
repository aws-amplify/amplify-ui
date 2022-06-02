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
      ariaLabel="color-switcher"
      value={colorMode}
      size="small"
      onChange={(value: ColorMode) => setColorMode(value)}
      isExclusive
      isSelectionRequired
      className="color-switcher"
    >
      <ToggleButton value="light" title="Light mode">
        <VisuallyHidden>Light mode</VisuallyHidden>
        <MdWbSunny className="docs-header-icon" />
      </ToggleButton>
      <ToggleButton value="dark" title="Dark mode">
        <VisuallyHidden>Dark mode</VisuallyHidden>
        <MdBedtime className="docs-header-icon" />
      </ToggleButton>
      <ToggleButton value="system" title="System preferences">
        <VisuallyHidden>System preference</VisuallyHidden>
        <MdTonality className="docs-header-icon" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
