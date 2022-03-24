import { DesignToken, ShadowValue } from '../types/designToken';

interface DisableToken {
  cursor: any;
}

interface ButtonDisabledToken {
  borderColor: any;
}
interface ButtonErrorFocusToken {
  borderColor: any;
  boxShadow: DesignToken<ShadowValue>;
}
interface ButtonErrorToken {
  borderColor: any;
  _focus: ButtonErrorFocusToken;
}
interface ButtonFocusToken {
  outlineColor: any;
  outlineStyle: any;
  outlineWidth: any;
  outlineOffset: any;
  borderColor: any;
  boxShadow: DesignToken<ShadowValue>;
}
interface BeforeToken {
  width: any;
  height: any;
  borderWidth: any;
  borderRadius: any;
  borderStyle: any;
  borderColor: any;
}
interface ButtonToken {
  position: any;
  alignItems: any;
  justifyContent: any;
  color: any;
  before: BeforeToken;
  _focus: ButtonFocusToken;
  _disabled: ButtonDisabledToken;
  _error: ButtonErrorToken;
}
interface IconCheckedDisabled {
  backgroundColor: any;
}
interface IconCheckedToken {
  opacity: any;
  transform: any;
  _disabled: IconCheckedDisabled;
}
interface IconToken {
  backgroundColor: any;
  borderRadius: any;
  opacity: any;
  transform: any;
  transitionProperty: any;
  transitionDuration: any;
  transitionTimingFunction: any;
  _checked: IconCheckedToken;
}
interface LabelDisabledToken {
  color: any;
}
interface LabelToken {
  _disabled: LabelDisabledToken;
}
export interface CheckboxTokens {
  cursor: any;
  alignItems: any;
  _disabled: DisableToken;
  button: ButtonToken;
  icon: IconToken;
  label: LabelToken;
}

export const checkbox: CheckboxTokens = {
  cursor: { value: 'pointer' },
  alignItems: { value: 'center' },
  _disabled: {
    cursor: {
      value: 'not-allowed',
    },
  },
  button: {
    position: { value: 'relative' },
    alignItems: { value: 'center' },
    justifyContent: { value: 'center' },
    color: { value: '{colors.white.value}' },
    before: {
      width: { value: '100%' },
      height: { value: '100%' },
      borderWidth: { value: '{borderWidths.medium.value}' },
      borderRadius: { value: '20%' },
      borderStyle: { value: 'solid' },
      borderColor: { value: '{colors.border.primary.value}' },
    },
    _focus: {
      outlineColor: { value: '{colors.transparent.value}' },
      outlineStyle: { value: 'solid' },
      outlineWidth: { value: '{outlineWidths.medium.value}' },
      outlineOffset: { value: '{outlineOffsets.medium.value}' },
      borderColor: { value: '{colors.transparent.value}' },
      boxShadow: {
        value: {
          offsetX: '0px',
          offsetY: '0px',
          blurRadius: '0px',
          spreadRadius: '2px',
          color: '{colors.border.focus.value}',
        },
      },
    },
    _disabled: {
      borderColor: { value: '{colors.border.disabled.value}' },
    },
    _error: {
      borderColor: { value: '{colors.border.error.value}' },
      _focus: {
        borderColor: { value: '{colors.transparent.value}' },
        boxShadow: {
          value: {
            offsetX: '0px',
            offsetY: '0px',
            blurRadius: '0px',
            spreadRadius: '2px',
            color: '{colors.border.error.value}',
          },
        },
      },
    },
  },
  icon: {
    backgroundColor: { value: '{colors.brand.primary.80.value}' },
    borderRadius: { value: '20%' },
    opacity: { value: '{opacities.0.value}' },
    transform: { value: 'scale(0)' },
    transitionProperty: { value: 'all' },
    transitionDuration: { value: '{time.short.value}' },
    transitionTimingFunction: { value: 'ease-in-out' },
    _checked: {
      opacity: { value: '{opacities.100.value}' },
      transform: { value: 'scale(1)' },
      _disabled: {
        backgroundColor: { value: '{colors.background.disabled.value}' },
      },
    },
  },
  label: {
    _disabled: {
      color: { value: '{colors.font.disabled.value}' },
    },
  },
};
