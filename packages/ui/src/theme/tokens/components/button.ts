import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type StateTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'borderColor' | 'color',
  Output
>;

type StateWithShadowTokens<Output> = StateTokens<Output> &
  DesignTokenProperties<'boxShadow', Output>;

type MenuStateTokens<Output> = Omit<StateTokens<Output>, 'borderColor'>;

type PrimaryVariationTokens<Output> = StateTokens<Output> &
  DesignTokenProperties<'borderStyle' | 'borderWidth', Output> & {
    _disabled?: StateTokens<Output>;
    _loading?: StateTokens<Output>;
    _hover?: StateTokens<Output>;
    _focus?: StateWithShadowTokens<Output>;
    _active?: StateTokens<Output>;
  };

type MenuVariationTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'borderWidth' | 'justifyContent',
  Output
> & {
  _hover?: MenuStateTokens<Output>;
  _focus?: MenuStateTokens<Output>;
  _active?: MenuStateTokens<Output>;
  _disabled?: Omit<StateTokens<Output>, 'borderColor' | 'backgroundColor'>;
};

type LinkVariationTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'borderColor' | 'borderWidth' | 'color',
  Output
> & {
  _hover?: StateTokens<Output>;
  _focus?: StateWithShadowTokens<Output>;
  _active?: StateTokens<Output>;
  _disabled?: StateTokens<Output>;
  _loading?: StateTokens<Output>;
};

type ButtonSizeTokens<Output> = DesignTokenProperties<
  | 'fontSize'
  | 'paddingBlockStart'
  | 'paddingBlockEnd'
  | 'paddingInlineStart'
  | 'paddingInlineEnd',
  Output
>;

export type ButtonTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<
    | 'fontWeight'
    | 'transitionDuration'
    | 'fontSize'
    | 'lineHeight'
    | 'paddingBlockStart'
    | 'paddingBlockEnd'
    | 'paddingInlineStart'
    | 'paddingInlineEnd'
    | 'borderColor'
    | 'borderWidth'
    | 'borderStyle'
    | 'borderRadius'
    | 'color',
    Output
  > & {
    _hover?: StateTokens<Output>;
    _focus?: StateWithShadowTokens<Output>;
    _active?: StateTokens<Output>;
    _loading?: StateTokens<Output>;
    _disabled?: StateTokens<Output>;
    primary?: PrimaryVariationTokens<Output>;
    warning?: LinkVariationTokens<Output>;
    destructive?: PrimaryVariationTokens<Output>;
    menu?: MenuVariationTokens<Output>;
    link?: LinkVariationTokens<Output>;
    small?: ButtonSizeTokens<Output>;
    large?: ButtonSizeTokens<Output>;
    loaderWrapper?: DesignTokenProperties<'alignItems' | 'gap', Output>;
  };

export const button: Required<ButtonTokens<'default'>> = {
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

  warning: {
    backgroundColor: { value: 'transparent' },
    borderColor: { value: '{colors.red.60}' },
    borderWidth: { value: '{borderWidths.small}' },
    color: { value: '{colors.red.60}' },
    _hover: {
      borderColor: { value: '{colors.red.80}' },
      backgroundColor: { value: '{colors.red.10}' },
      color: { value: '{colors.font.error}' },
    },
    _focus: {
      borderColor: { value: '{colors.red.80}' },
      backgroundColor: { value: '{colors.red.10}' },
      color: { value: '{colors.red.80}' },
      boxShadow: { value: '{components.fieldcontrol._error._focus.boxShadow}' },
    },
    _active: {
      borderColor: { value: '{colors.red.100}' },
      backgroundColor: { value: '{colors.red.20}' },
      color: { value: '{colors.red.100}' },
    },
    _disabled: {
      borderColor: { value: '{colors.border.tertiary}' },
      backgroundColor: { value: 'transparent' },
      color: { value: '{colors.font.disabled}' },
    },
    _loading: {
      borderColor: { value: '{colors.border.tertiary}' },
      backgroundColor: { value: 'transparent' },
      color: { value: '{colors.font.disabled}' },
    },
  },

  destructive: {
    borderColor: { value: 'transparent' },
    borderWidth: { value: '{borderWidths.small}' },
    borderStyle: { value: 'solid' },
    backgroundColor: { value: '{colors.red.60}' },
    color: { value: '{colors.font.inverse}' },
    _disabled: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.background.disabled}' },
      color: { value: '{colors.font.disabled}' },
    },
    _loading: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.background.disabled}' },
      color: { value: '{colors.font.disabled}' },
    },
    _hover: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.red.80}' },
      color: { value: '{colors.font.inverse}' },
    },
    _focus: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.red.80}' },
      color: { value: '{colors.font.inverse}' },
      boxShadow: { value: '{components.fieldcontrol._error._focus.boxShadow}' },
    },
    _active: {
      borderColor: { value: 'transparent' },
      backgroundColor: { value: '{colors.red.100}' },
      color: { value: '{colors.font.inverse}' },
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
