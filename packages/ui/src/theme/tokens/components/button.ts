import {
  AlignItemsValue,
  BackgroundColorValue,
  BorderColorValue,
  BorderRadiusValue,
  BorderStyleValue,
  BorderWidthValue,
  BoxShadowValue,
  ColorValue,
  DesignToken,
  FontSizeValue,
  FontWeightValue,
  JustifyContentValue,
  LineHeightValue,
  SpaceValue,
  TransitionDurationValue,
} from '../types/designToken';

export interface StateTokens {
  color: DesignToken<ColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderColor: DesignToken<BorderColorValue>;
}

interface StateWithShadowTokens extends StateTokens {
  boxShadow: DesignToken<BoxShadowValue>;
}

interface MenuStateDisabledTokens
  extends Omit<StateTokens, 'borderColor' | 'backgroundColor'> {}

interface MenuStateTokens extends Omit<StateTokens, 'borderColor'> {}

interface PrimaryVariationTokens {
  borderWidth: DesignToken<BorderWidthValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderColor: DesignToken<BorderColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
  color: DesignToken<ColorValue>;
  _disabled: StateTokens;
  _loading: StateTokens;
  _hover: StateTokens;
  _focus: StateWithShadowTokens;
  _active: StateTokens;
}

interface MenuVariationTokens {
  borderWidth: DesignToken<BorderWidthValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
  justifyContent: DesignToken<JustifyContentValue>;
  _hover: MenuStateTokens;
  _focus: MenuStateTokens;
  _active: MenuStateTokens;
  _disabled: MenuStateDisabledTokens;
}

interface LinkVariationTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  color: DesignToken<ColorValue>;
  _hover: StateTokens;
  _focus: StateWithShadowTokens;
  _active: StateTokens;
  _disabled: StateTokens;
  _loading: StateTokens;
}

interface ButtonSizeTokens {
  fontSize: DesignToken<FontSizeValue>;
  paddingBlockStart: DesignToken<SpaceValue>;
  paddingBlockEnd: DesignToken<SpaceValue>;
  paddingInlineStart: DesignToken<SpaceValue>;
  paddingInlineEnd: DesignToken<SpaceValue>;
}
export interface ButtonTokens {
  fontWeight: DesignToken<FontWeightValue>;
  transitionDuration: DesignToken<TransitionDurationValue>;
  fontSize: DesignToken<FontSizeValue>;
  lineHeight: DesignToken<LineHeightValue>;
  paddingBlockStart: DesignToken<SpaceValue>;
  paddingBlockEnd: DesignToken<SpaceValue>;
  paddingInlineStart: DesignToken<SpaceValue>;
  paddingInlineEnd: DesignToken<SpaceValue>;
  borderColor: DesignToken<BorderColorValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  color: DesignToken<ColorValue>;
  _hover: StateTokens;
  _focus: StateWithShadowTokens;
  _active: StateTokens;
  _loading: StateTokens;
  _disabled: StateTokens;
  primary: PrimaryVariationTokens;
  menu: MenuVariationTokens;
  link: LinkVariationTokens;
  small: ButtonSizeTokens;
  large: ButtonSizeTokens;
  loaderWrapper: {
    alignItems: DesignToken<AlignItemsValue>;
    gap: DesignToken<SpaceValue>;
  };
}

export const button: ButtonTokens = {
  // shared styles
  fontWeight: { value: '{fontWeights.bold.value}' },
  transitionDuration: {
    value: '{components.fieldcontrol.transitionDuration.value}',
  },
  fontSize: { value: '{components.fieldcontrol.fontSize.value}' },
  lineHeight: { value: '{components.fieldcontrol.lineHeight.value}' },
  paddingBlockStart: {
    value: '{components.fieldcontrol.paddingBlockStart.value}',
  },
  paddingBlockEnd: {
    value: '{components.fieldcontrol.paddingBlockEnd.value}',
  },
  paddingInlineStart: {
    value: '{components.fieldcontrol.paddingInlineStart.value}',
  },
  paddingInlineEnd: {
    value: '{components.fieldcontrol.paddingInlineEnd.value}',
  },
  borderColor: { value: '{components.fieldcontrol.borderColor.value}' },
  borderWidth: { value: '{components.fieldcontrol.borderWidth.value}' },
  borderStyle: { value: '{components.fieldcontrol.borderStyle.value}' },
  borderRadius: { value: '{components.fieldcontrol.borderRadius.value}' },
  color: { value: '{colors.font.primary.value}' },

  _hover: {
    color: { value: '{colors.font.focus.value}' },
    backgroundColor: { value: '{colors.brand.primary.10.value}' },
    borderColor: { value: '{colors.brand.primary.60.value}' },
  },
  _focus: {
    color: { value: '{colors.font.focus.value}' },
    backgroundColor: { value: '{colors.brand.primary.10.value}' },
    borderColor: { value: '{colors.border.focus.value}' },
    boxShadow: { value: '{components.fieldcontrol._focus.boxShadow.value}' },
  },
  _active: {
    color: { value: '{colors.font.active.value}' },
    backgroundColor: { value: '{colors.brand.primary.20.value}' },
    borderColor: { value: '{colors.brand.primary.100.value}' },
  },
  _loading: {
    color: { value: '{colors.font.disabled.value}' },
    backgroundColor: { value: 'transparent' },
    borderColor: { value: '{colors.border.tertiary.value}' },
  },
  _disabled: {
    color: { value: '{colors.font.disabled.value}' },
    backgroundColor: { value: 'transparent' },
    borderColor: { value: '{colors.border.tertiary.value}' },
  },

  // variations
  primary: {
    borderColor: { value: 'transparent' },
    borderWidth: { value: '{borderWidths.small.value}' },
    borderStyle: { value: 'solid' },
    backgroundColor: { value: '{colors.brand.primary.80.value}' },
    color: { value: '{colors.font.inverse.value}' },
    _disabled: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.background.disabled.value}' },
      color: { value: '{colors.font.disabled.value}' },
    },
    _loading: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.background.disabled.value}' },
      color: { value: '{colors.font.disabled.value}' },
    },
    _hover: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.brand.primary.90.value}' },
      color: { value: '{colors.font.inverse.value}' },
    },
    _focus: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.brand.primary.90.value}' },
      color: { value: '{colors.font.inverse.value}' },
      boxShadow: { value: '{components.fieldcontrol._focus.boxShadow.value}' },
    },
    _active: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.brand.primary.100.value}' },
      color: { value: '{colors.font.inverse.value}' },
    },
  },

  menu: {
    borderWidth: { value: '{space.zero.value}' },
    backgroundColor: { value: 'transparent' },
    justifyContent: { value: 'start' },
    // Focus and hover styles are identical for menu variation
    // because for Menu primitive, menu items are forced to be focused even
    // for mouse interactions, making it impossible to distinguish the two interactions
    _hover: {
      color: { value: '{colors.font.inverse.value}' },
      backgroundColor: { value: '{colors.brand.primary.80.value}' },
    },
    _focus: {
      color: { value: '{colors.font.inverse.value}' },
      backgroundColor: { value: '{colors.brand.primary.80.value}' },
    },
    _active: {
      color: { value: '{colors.font.inverse.value}' },
      backgroundColor: { value: '{colors.brand.primary.90.value}' },
    },
    _disabled: {
      color: { value: '{colors.font.disabled.value}' },
    },
  },

  link: {
    backgroundColor: { value: 'transparent' },
    borderColor: { value: 'transparent' },
    borderWidth: { value: '{space.zero.value}' },
    color: { value: '{colors.font.interactive.value}' },
    _hover: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.brand.primary.10.value}' },
      color: { value: '{colors.font.hover.value}' },
    },
    _focus: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.brand.primary.10.value}' },
      color: { value: '{colors.font.focus.value}' },
      boxShadow: { value: '{components.fieldcontrol._focus.boxShadow.value}' },
    },
    _active: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.brand.primary.20.value}' },
      color: { value: '{colors.font.active.value}' },
    },
    _disabled: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: 'transparent' },
      color: { value: '{colors.font.disabled.value}' },
    },
    _loading: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: 'transparent' },
      color: { value: '{colors.font.disabled.value}' },
    },
  },

  // sizes
  small: {
    fontSize: { value: '{components.fieldcontrol.small.fontSize.value}' },
    paddingBlockStart: {
      value: '{components.fieldcontrol.small.paddingBlockStart.value}',
    },
    paddingBlockEnd: {
      value: '{components.fieldcontrol.small.paddingBlockEnd.value}',
    },
    paddingInlineStart: {
      value: '{components.fieldcontrol.small.paddingInlineStart.value}',
    },
    paddingInlineEnd: {
      value: '{components.fieldcontrol.small.paddingInlineEnd.value}',
    },
  },

  large: {
    fontSize: { value: '{components.fieldcontrol.large.fontSize.value}' },
    paddingBlockStart: {
      value: '{components.fieldcontrol.large.paddingBlockStart.value}',
    },
    paddingBlockEnd: {
      value: '{components.fieldcontrol.large.paddingBlockEnd.value}',
    },
    paddingInlineStart: {
      value: '{components.fieldcontrol.large.paddingInlineStart.value}',
    },
    paddingInlineEnd: {
      value: '{components.fieldcontrol.large.paddingInlineEnd.value}',
    },
  },

  loaderWrapper: {
    alignItems: {
      value: 'center',
    },
    gap: {
      value: '{space.xs.value}',
    },
  },
};
