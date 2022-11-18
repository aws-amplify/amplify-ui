import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type FieldControlSizeTokens<Output> = DesignTokenProperties<
  | 'fontSize'
  | 'paddingBlockStart'
  | 'paddingBlockEnd'
  | 'paddingInlineStart'
  | 'paddingInlineEnd',
  Output
>;

type FieldControlFocusTokens<Output> = DesignTokenProperties<
  'borderColor' | 'boxShadow',
  Output
>;

type FieldControlDisabledTokens<Output> = DesignTokenProperties<
  'color' | 'cursor' | 'borderColor' | 'backgroundColor',
  Output
>;

type FieldControlErrorTokens<Output> = DesignTokenProperties<
  'borderColor',
  Output
> & {
  _focus?: DesignTokenProperties<'boxShadow', Output>;
};

type FieldControlQuietTokens<Output> = DesignTokenProperties<
  | 'borderStyle'
  | 'borderInlineStart'
  | 'borderInlineEnd'
  | 'borderBlockStart'
  | 'borderRadius',
  Output
> & {
  _focus?: DesignTokenProperties<'borderBlockEndColor' | 'boxShadow', Output>;
  _error?: DesignTokenProperties<'borderBlockEndColor', Output> & {
    _focus?: DesignTokenProperties<'boxShadow', Output>;
  };
};

export type FieldControlTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<
    | 'borderStyle'
    | 'borderColor'
    | 'borderWidth'
    | 'borderRadius'
    | 'color'
    | 'paddingBlockStart'
    | 'paddingBlockEnd'
    | 'paddingInlineStart'
    | 'paddingInlineEnd'
    | 'fontSize'
    | 'lineHeight'
    | 'transitionDuration'
    | 'outlineColor'
    | 'outlineStyle'
    | 'outlineWidth'
    | 'outlineOffset',
    Output
  > & {
    small?: FieldControlSizeTokens<Output>;
    large?: FieldControlSizeTokens<Output>;
    quiet?: FieldControlQuietTokens<Output>;
    _focus?: FieldControlFocusTokens<Output>;
    _disabled?: FieldControlDisabledTokens<Output>;
    _error?: FieldControlErrorTokens<Output>;
  };

export const fieldcontrol: Required<FieldControlTokens<'default'>> = {
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
