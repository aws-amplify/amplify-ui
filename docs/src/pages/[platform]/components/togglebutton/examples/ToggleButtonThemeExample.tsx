import * as React from 'react';
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
} from 'react-icons/md';
import {
  ToggleButton,
  ToggleButtonGroup,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'toggleButton-theme',
  tokens: {
    components: {
      togglebutton: {
        // TODO: customize here
      },
      togglebuttongroup: {
        // TODO: customize here
      },
    },
  },
};

export const ToggleButtonThemeExample = () => {
  const [exclusiveValue, setExclusiveValue] = React.useState('align-left');
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

/*

  borderColor: { value: '{colors.border.primary.value}' },
  color: { value: '{colors.font.primary.value}' },
  _hover: {
    backgroundColor: { value: '{colors.overlay.10.value}' },
  },
  _focus: {
    borderColor: { value: '{colors.border.focus.value}' },
    color: { value: '{colors.font.primary.value}' },
  },
  _active: {
    backgroundColor: { value: '{colors.transparent.value}' },
  },
  _disabled: {
    backgroundColor: { value: '{colors.transparent.value}' },
    borderColor: { value: '{colors.border.disabled.value}' },
    color: { value: '{colors.font.disabled.value}' },
  },
  _pressed: {
    borderColor: { value: '{colors.border.pressed.value}' },
    color: { value: '{colors.font.primary.value}' },
    backgroundColor: { value: '{colors.overlay.20.value}' },
    _hover: {
      backgroundColor: { value: '{colors.overlay.30.value}' },
    },
  },
  primary: {
    backgroundColor: { value: '{colors.transparent.value}' },
    borderWidth: { value: '{borderWidths.small.value}' },
    _focus: {
      borderColor: { value: '{colors.border.focus.value}' },
      backgroundColor: { value: '{colors.transparent.value}' },
      boxShadow: { value: '{components.fieldcontrol._focus.boxShadow.value}' },
      color: { value: '{colors.font.primary.value}' },
    },
    _hover: {
      backgroundColor: { value: '{colors.overlay.10.value}' },
      color: { value: '{colors.font.primary.value}' },
    },
    _disabled: {
      borderColor: { value: '{colors.border.disabled.value}' },
      backgroundColor: { value: '{colors.background.disabled.value}' },
      color: { value: '{colors.font.disabled.value}' },
    },
    _pressed: {
      backgroundColor: { value: '{colors.brand.primary.80.value}' },
      borderColor: { value: '{colors.brand.primary.80.value}' },
      color: { value: '{colors.white.value}' },
      _focus: {
        backgroundColor: {
          value: '{colors.border.focus.value}',
        },
        borderColor: { value: '{colors.border.focus.value}' },
        color: { value: '{colors.white.value}' },
      },
      _hover: {
        borderColor: { value: '{colors.brand.primary.60.value}' },
        backgroundColor: {
          value: '{colors.brand.primary.60.value}',
        },
        boxShadow: { value: '{colors.brand.primary.60.value}' },
        color: { value: '{colors.white.value}' },
      },
    },
  },
  link: {
    backgroundColor: { value: '{colors.transparent.value}' },
    color: { value: '{colors.overlay.50.value}' },
    _hover: {
      backgroundColor: { value: '{colors.transparent.value}' },
      color: { value: '{colors.overlay.50.value}' },
    },
    _focus: {
      backgroundColor: { value: '{colors.transparent.value}' },
      color: { value: '{colors.overlay.50.value}' },
    },
    _disabled: {
      backgroundColor: { value: '{colors.transparent.value}' },
      color: { value: '{colors.font.disabled.value}' },
    },
    _pressed: {
      backgroundColor: { value: '{colors.transparent.value}' },
      color: { value: '{colors.overlay.90.value}' },
      _focus: {
        backgroundColor: { value: '{colors.transparent.value}' },
        color: { value: '{colors.overlay.90.value}' },
      },
      _hover: {
        color: { value: '{colors.overlay.90.value}' },
        backgroundColor: { value: '{colors.transparent.value}' },
      },
    },
  },

*/
