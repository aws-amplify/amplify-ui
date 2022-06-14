import {
  AlignItemsValue,
  BackgroundColorValue,
  BorderColorValue,
  BorderRadiusValue,
  BorderStyleValue,
  BorderWidthValue,
  BoxShadowValue,
  ColorValue,
  CursorValue,
  DesignToken,
  JustifyContentValue,
  OpacityValue,
  OutlineColorValue,
  OutlineOffsetValue,
  OutlineStyleValue,
  OutlineWidthValue,
  PositionValue,
  SpaceValue,
  TransformValue,
  TransitionDurationValue,
  TransitionPropertyValue,
  TransitionTimingFunctionValue,
} from '../types/designToken';

interface DisableToken {
  cursor: DesignToken<CursorValue>;
}

interface ButtonDisabledToken {
  borderColor: DesignToken<BorderColorValue>;
}
interface ButtonErrorFocusToken {
  borderColor: DesignToken<BorderColorValue>;
  boxShadow: DesignToken<BoxShadowValue>;
}
interface ButtonErrorToken {
  borderColor: DesignToken<BorderColorValue>;
  _focus: ButtonErrorFocusToken;
}
interface ButtonFocusToken {
  outlineColor: DesignToken<OutlineColorValue>;
  outlineStyle: DesignToken<OutlineStyleValue>;
  outlineWidth: DesignToken<OutlineWidthValue>;
  outlineOffset: DesignToken<OutlineOffsetValue>;
  borderColor: DesignToken<BorderColorValue>;
  boxShadow: DesignToken<BoxShadowValue>;
}
interface BeforeToken {
  width: DesignToken<SpaceValue>;
  height: DesignToken<SpaceValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderColor: DesignToken<BorderColorValue>;
}
interface ButtonToken {
  position: DesignToken<PositionValue>;
  alignItems: DesignToken<AlignItemsValue>;
  justifyContent: DesignToken<JustifyContentValue>;
  color: DesignToken<ColorValue>;
  before: BeforeToken;
  _focus: ButtonFocusToken;
  _disabled: ButtonDisabledToken;
  _error: ButtonErrorToken;
}
interface IconCheckedDisabled {
  backgroundColor: DesignToken<BackgroundColorValue>;
}
interface IconCheckedToken {
  opacity: DesignToken<OpacityValue>;
  transform: DesignToken<TransformValue>;
  _disabled: IconCheckedDisabled;
}
interface IconToken {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  opacity: DesignToken<OpacityValue>;
  transform: DesignToken<TransformValue>;
  transitionProperty: DesignToken<TransitionPropertyValue>;
  transitionDuration: DesignToken<TransitionDurationValue>;
  transitionTimingFunction: DesignToken<TransitionTimingFunctionValue>;
  _checked: IconCheckedToken;
}
interface LabelDisabledToken {
  color: DesignToken<ColorValue>;
}
interface LabelToken {
  _disabled: LabelDisabledToken;
}
export interface CheckboxTokens {
  cursor: DesignToken<CursorValue>;
  alignItems: DesignToken<AlignItemsValue>;
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
    color: { value: '{colors.font.inverse.value}' },
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
