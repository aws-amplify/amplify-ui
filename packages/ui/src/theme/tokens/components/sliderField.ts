import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type SliderFieldThumbStateTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'borderColor' | 'boxShadow',
  Output
>;

type SliderFieldSizeTokens<Output> = {
  track?: DesignTokenProperties<'height', Output>;
  thumb?: DesignTokenProperties<'height' | 'width', Output>;
};

export type SliderFieldTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'paddingBlock', Output> & {
    track?: DesignTokenProperties<
      'backgroundColor' | 'borderRadius' | 'height' | 'minWidth',
      Output
    >;
    range?: DesignTokenProperties<
      'backgroundColor' | 'borderRadius',
      Output
    > & {
      _disabled?: DesignTokenProperties<'backgroundColor', Output>;
    };
    thumb?: DesignTokenProperties<
      | 'backgroundColor'
      | 'borderColor'
      | 'borderRadius'
      | 'borderStyle'
      | 'borderWidth'
      | 'boxShadow'
      | 'height'
      | 'width',
      Output
    > & {
      _disabled?: SliderFieldThumbStateTokens<Output> &
        DesignTokenProperties<'boxShadow', Output>;
      _hover?: Omit<
        SliderFieldThumbStateTokens<Output>,
        Output extends 'default' ? 'boxShadow' : never
      >;
      _focus?: Omit<
        SliderFieldThumbStateTokens<Output>,
        Output extends 'default' ? 'backgroundColor' : never
      >;
    };
    small?: SliderFieldSizeTokens<Output>;
    large?: SliderFieldSizeTokens<Output>;
  };

export const sliderfield: Required<SliderFieldTokens<'default'>> = {
  paddingBlock: { value: '{space.xs.value}' },

  // The track is the thin background of the slider
  track: {
    backgroundColor: { value: '{colors.background.quaternary.value}' },
    borderRadius: { value: '9999px' },
    height: { value: '0.375rem' },
    minWidth: { value: '10rem' },
  },

  // The range is the filled part of the track
  range: {
    backgroundColor: { value: '{colors.brand.primary.80.value}' },
    borderRadius: { value: '9999px' },
    _disabled: {
      backgroundColor: { value: '{colors.background.disabled.value}' },
    },
  },

  // The thumb is the circle above the track that the user drags
  thumb: {
    width: { value: '1.25rem' },
    height: { value: '1.25rem' },
    backgroundColor: { value: '{colors.background.primary.value}' },
    boxShadow: { value: '{shadows.small.value}' },
    borderRadius: { value: '50%' },
    borderWidth: { value: '{borderWidths.medium.value}' },
    borderColor: { value: '{colors.border.primary.value}' },
    borderStyle: { value: 'solid' },
    _disabled: {
      backgroundColor: { value: '{colors.background.disabled.value}' },
      borderColor: { value: 'transparent' },
      boxShadow: { value: 'none' },
    },
    _hover: {
      backgroundColor: { value: '{colors.background.primary.value}' },
      borderColor: { value: '{colors.border.focus.value}' },
    },
    _focus: {
      borderColor: { value: '{colors.border.focus.value}' },
      boxShadow: {
        value: {
          offsetX: '0',
          offsetY: '0',
          blurRadius: '0',
          spreadRadius: '2px',
          color: '{colors.border.focus.value}',
        },
      },
    },
  },

  small: {
    track: {
      height: { value: '0.25rem' },
    },
    thumb: {
      width: { value: '1rem' },
      height: { value: '1rem' },
    },
  },

  large: {
    track: {
      height: { value: '0.625rem' },
    },
    thumb: {
      width: { value: '1.5rem' },
      height: { value: '1.5rem' },
    },
  },
};
