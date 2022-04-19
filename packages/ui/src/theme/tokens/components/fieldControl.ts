import {
  BackgroundColorValue,
  BorderColorValue,
  BorderRadiusValue,
  BorderStyleValue,
  BorderValue,
  BorderWidthValue,
  BoxShadowValue,
  ColorValue,
  CursorValue,
  DesignToken,
  FontSizeValue,
  LineHeightValue,
  OutlineColorValue,
  OutlineOffsetValue,
  OutlineStyleValue,
  OutlineWidthValue,
  SpaceValue,
  TransitionDurationValue,
} from '../types/designToken';

interface FieldControlSizeTokens {
  fontSize: DesignToken<FontSizeValue>;
  paddingBlockStart: DesignToken<SpaceValue>;
  paddingBlockEnd: DesignToken<SpaceValue>;
  paddingInlineStart: DesignToken<SpaceValue>;
  paddingInlineEnd: DesignToken<SpaceValue>;
}

interface FieldControlFocusTokens {
  borderColor: DesignToken<BorderColorValue>;
  boxShadow: DesignToken<BoxShadowValue>;
}

interface FieldControlDisabledTokens {
  color: DesignToken<ColorValue>;
  cursor: DesignToken<CursorValue>;
  borderColor: DesignToken<BorderColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
}

interface FieldControlErrorTokens {
  borderColor: DesignToken<BorderColorValue>;
  _focus: FieldControlErrorFocusTokens;
}

interface FieldControlErrorFocusTokens {
  boxShadow: DesignToken<BoxShadowValue>;
}

interface FieldControlQuietTokens {
  borderStyle: DesignToken<BorderStyleValue>;
  borderBlockEnd: DesignToken<BorderValue>;
  borderInlineStart: DesignToken<BorderValue>;
  borderInlineEnd: DesignToken<BorderValue>;
  borderBlockStart: DesignToken<BorderValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  _focus: FieldControlQuietFocusTokens;
  _error: FieldControlQuietErrorTokens;
}

interface FieldControlQuietFocusTokens {
  borderBlockEndColor: DesignToken<ColorValue>;
  boxShadow: DesignToken<BoxShadowValue>;
}

interface FieldControlQuietErrorTokens {
  borderBlockEndColor: DesignToken<ColorValue>;
  _focus: FieldControlQuietErrorFocusTokens;
}

interface FieldControlQuietErrorFocusTokens {
  boxShadow: DesignToken<BoxShadowValue>;
}

export interface FieldControlTokens {
  borderStyle: DesignToken<BorderStyleValue>;
  borderColor: DesignToken<BorderColorValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  color: DesignToken<ColorValue>;
  paddingBlockStart: DesignToken<SpaceValue>;
  paddingBlockEnd: DesignToken<SpaceValue>;
  paddingInlineStart: DesignToken<SpaceValue>;
  paddingInlineEnd: DesignToken<SpaceValue>;

  fontSize: DesignToken<FontSizeValue>;
  lineHeight: DesignToken<LineHeightValue>;
  transitionDuration: DesignToken<TransitionDurationValue>;
  outlineColor: DesignToken<OutlineColorValue>;
  outlineStyle: DesignToken<OutlineStyleValue>;
  outlineWidth: DesignToken<OutlineWidthValue>;
  outlineOffset: DesignToken<OutlineOffsetValue>;

  small: FieldControlSizeTokens;
  large: FieldControlSizeTokens;
  quiet: FieldControlQuietTokens;
  _focus: FieldControlFocusTokens;
  _disabled: FieldControlDisabledTokens;
  _error: FieldControlErrorTokens;
}

export const fieldcontrol: FieldControlTokens = {
  borderStyle: { value: 'solid' },
  borderColor: { value: '{colors.border.primary.value}' },
  borderWidth: { value: '{borderWidths.small.value}' },
  borderRadius: { value: '{radii.small.value}' },
  color: { value: '{colors.font.primary.value}' },
  paddingBlockStart: {
    value: '{space.xs.value}',
  },
  paddingBlockEnd: {
    value: '{space.xs.value}',
  },
  paddingInlineStart: {
    value: '{space.medium.value}',
  },
  paddingInlineEnd: {
    value: '{space.medium.value}',
  },

  fontSize: { value: '{components.field.fontSize.value}' },
  lineHeight: { value: '{lineHeights.medium.value}' },
  transitionDuration: { value: '{time.medium.value}' },
  outlineColor: { value: '{colors.transparent.value}' },
  outlineStyle: { value: 'solid' },
  outlineWidth: { value: '{outlineWidths.medium.value}' },
  outlineOffset: { value: '{outlineOffsets.medium.value}' },

  small: {
    fontSize: { value: '{components.field.small.fontSize.value}' },
    paddingBlockStart: {
      value: '{space.xxs.value}',
    },
    paddingBlockEnd: {
      value: '{space.xxs.value}',
    },
    paddingInlineStart: {
      value: '{space.small.value}',
    },
    paddingInlineEnd: {
      value: '{space.small.value}',
    },
  },
  large: {
    fontSize: { value: '{components.field.large.fontSize.value}' },
    paddingBlockStart: {
      value: '{space.xs.value}',
    },
    paddingBlockEnd: {
      value: '{space.xs.value}',
    },
    paddingInlineStart: {
      value: '{space.medium.value}',
    },
    paddingInlineEnd: {
      value: '{space.medium.value}',
    },
  },

  quiet: {
    borderStyle: { value: 'none' },
    borderBlockEnd: {
      value: '{borderWidths.small.value} solid {colors.border.primary.value}',
    },
    borderInlineStart: { value: 'none' },
    borderInlineEnd: { value: 'none' },
    borderBlockStart: { value: 'none' },
    borderRadius: { value: '0' },
    _focus: {
      borderBlockEndColor: { value: '{colors.border.focus.value}' },
      boxShadow: {
        value: {
          offsetX: '0px',
          offsetY: '1px',
          color: '{colors.border.focus.value}',
          blurRadius: '0px',
        },
      },
    },
    _error: {
      borderBlockEndColor: { value: '{colors.border.error.value}' },
      _focus: {
        boxShadow: {
          value: {
            offsetX: '0px',
            offsetY: '1px',
            color: '{colors.border.error.value}',
            blurRadius: '0px',
          },
        },
      },
    },
  },
  _focus: {
    // These focus styles have been calibrated to create
    // a highly visible focus indicator per WCAG 2.1 guidliness:
    // See: https://www.w3.org/WAI/WCAG21/Techniques/general/G195.html
    //
    // Key features:
    // * Focus indicator area is at least the 1 CSS px border around the component.
    // * Contrast between focused and unfocused states has a ratio of 3:1
    //
    // IMPORTANT: Must recalibrate if `colors.border.primary` or `colors.focus` are changed
    borderColor: { value: '{colors.border.focus.value}' },
    boxShadow: {
      value: {
        offsetX: '0px',
        offsetY: '0px',
        blurRadius: '0px',
        spreadRadius: '1px',
        color: '{colors.border.focus.value}',
      },
    },
  },
  _disabled: {
    color: { value: '{colors.font.disabled.value}' },
    cursor: { value: 'not-allowed' },
    borderColor: { value: '{colors.transparent.value}' },
    backgroundColor: { value: '{colors.background.disabled.value}' },
  },
  _error: {
    borderColor: { value: '{colors.border.error.value}' },
    _focus: {
      boxShadow: {
        value: {
          offsetX: '0px',
          offsetY: '0px',
          blurRadius: '0px',
          spreadRadius: '1px',
          color: '{colors.border.error.value}',
        },
      },
    },
  },
};
