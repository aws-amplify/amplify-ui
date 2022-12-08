import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type SwitchFieldSizeTokens<OutputType> = DesignTokenProperties<
  'fontSize',
  OutputType
>;

type SwitchFieldTrackCheckedTokens<OutputType> = DesignTokenProperties<
  'backgroundColor',
  OutputType
>;

export type SwitchFieldTokens<OutputType extends OutputVariantKey> =
  DesignTokenProperties<'fontSize', OutputType> & {
    _disabled?: DesignTokenProperties<'opacity', OutputType>;
    _focused?: DesignTokenProperties<'shadow', OutputType>;
    large?: SwitchFieldSizeTokens<OutputType>;
    small?: SwitchFieldSizeTokens<OutputType>;
    label?: DesignTokenProperties<'padding', OutputType>;
    thumb?: DesignTokenProperties<
      'backgroundColor' | 'borderColor' | 'borderRadius' | 'width',
      OutputType
    > & {
      checked?: DesignTokenProperties<'transform', OutputType>;
      transition?: DesignTokenProperties<'duration', OutputType>;
    };
    track?: DesignTokenProperties<
      'backgroundColor' | 'borderRadius' | 'height' | 'width' | 'padding',
      OutputType
    > & {
      checked?: SwitchFieldTrackCheckedTokens<OutputType>;
      transition?: DesignTokenProperties<'duration', OutputType>;
      _error?: SwitchFieldTrackCheckedTokens<OutputType>;
    };
  };

export const switchfield: Required<SwitchFieldTokens<'default'>> = {
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
