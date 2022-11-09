import {
  BackgroundColorValue,
  BorderColorValue,
  BorderRadiusValue,
  DesignToken,
  DesignTokenProperties,
  FontSizeValue,
  OpacityValue,
  ShadowValue,
  SpaceValue,
  TransformValue,
  TransitionDurationValue,
} from '../types/designToken';

type SwitchFieldDisabledTokens<OutputType> = DesignTokenProperties<
  'opacity',
  OutputType
>;

type SwitchFieldFocusedTokens<OutputType> = DesignTokenProperties<
  'shadow',
  OutputType
>;

type SwitchFieldSizeTokens<OutputType> = DesignTokenProperties<
  'fontSize',
  OutputType
>;

type SwitchFieldLabelTokens<OutputType> = DesignTokenProperties<
  'padding',
  OutputType
>;

type SwitchFieldThumbTokens<OutputType> = DesignTokenProperties<
  'backgroundColor' | 'borderColor' | 'borderRadius' | 'width',
  OutputType
> & {
  checked: SwitchFieldThumbCheckedTokens<OutputType>;
  transition: SwitchFieldThumbTransitionTokens<OutputType>;
};

type SwitchFieldThumbTransitionTokens<OutputType> = DesignTokenProperties<
  'duration',
  OutputType
>;

type SwitchFieldThumbCheckedTokens<OutputType> = DesignTokenProperties<
  'transform',
  OutputType
>;

type SwitchFieldTrackTokens<OutputType> = DesignTokenProperties<
  'backgroundColor' | 'borderRadius' | 'height' | 'width' | 'padding',
  OutputType
> & {
  checked: SwitchFieldTrackCheckedTokens<OutputType>;
  transition: SwitchFieldTrackTransitionTokens<OutputType>;
  _error: SwitchFieldTrackCheckedTokens<OutputType>;
};

type SwitchFieldTrackTransitionTokens<OuptutType> = DesignTokenProperties<
  'duration',
  OuptutType
>;

type SwitchFieldTrackCheckedTokens<OutputType> = DesignTokenProperties<
  'backgroundColor',
  OutputType
>;

export type SwitchFieldTokens<OutputType = unknown> =
  DesignTokenProperties<'fontSize'> & {
    _disabled?: SwitchFieldDisabledTokens<OutputType>;
    _focused?: SwitchFieldFocusedTokens<OutputType>;
    large?: SwitchFieldSizeTokens<OutputType>;
    small?: SwitchFieldSizeTokens<OutputType>;
    label?: SwitchFieldLabelTokens<OutputType>;
    thumb?: SwitchFieldThumbTokens<OutputType>;
    track?: SwitchFieldTrackTokens<OutputType>;
  };

export const switchfield: SwitchFieldTokens = {
  // States
  _disabled: {
    opacity: { value: '{opacities.60.value}' },
  },
  _focused: {
    shadow: {
      value: {
        offsetX: '0px',
        offsetY: '0px',
        blurRadius: '0px',
        spreadRadius: '2px',
        color: '{colors.border.focus.value}',
      },
    },
  },

  // Sizes
  fontSize: { value: '{fontSizes.medium.value}' },
  large: {
    fontSize: { value: '{fontSizes.large.value}' },
  },
  small: {
    fontSize: { value: '{fontSizes.small.value}' },
  },

  // Child elements
  label: {
    padding: { value: '{space.xs.value}' },
  },

  thumb: {
    backgroundColor: { value: '{colors.background.primary.value}' },
    borderColor: { value: '{colors.border.tertiary.value}' },
    borderRadius: { value: '{radii.xxxl.value}' },
    checked: {
      transform: { value: '{transforms.slideX.medium.value}' },
    },
    transition: {
      duration: { value: '{time.medium.value}' },
    },
    width: { value: '{space.relative.medium.value}' },
  },

  track: {
    backgroundColor: { value: '{colors.background.quaternary.value}' },
    borderRadius: { value: '{radii.xxxl.value}' },
    checked: {
      backgroundColor: { value: '{colors.brand.primary.80.value}' },
    },
    height: { value: '{space.relative.medium.value}' },
    padding: { value: '{outlineWidths.medium.value}' },
    transition: {
      duration: { value: '{time.short.value}' },
    },
    width: { value: '{space.relative.xl.value}' },

    _error: {
      backgroundColor: { value: '{colors.background.error.value}' },
    },
  },
};
