import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type ToggleButtonStateTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'color',
  Output
>;

export type ToggleButtonTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'borderColor' | 'color', Output> & {
    _hover?: DesignTokenProperties<'backgroundColor', Output>;
    _focus?: DesignTokenProperties<'borderColor' | 'color', Output>;
    _active?: DesignTokenProperties<'backgroundColor', Output>;
    _disabled?: DesignTokenProperties<
      'backgroundColor' | 'borderColor' | 'color',
      Output
    >;
    _pressed?: DesignTokenProperties<
      'backgroundColor' | 'borderColor' | 'color',
      Output
    > & {
      _hover?: DesignTokenProperties<'backgroundColor', Output>;
    };
    primary?: DesignTokenProperties<
      'backgroundColor' | 'borderWidth',
      Output
    > & {
      _focus?: DesignTokenProperties<
        'backgroundColor' | 'borderColor' | 'boxShadow' | 'color',
        Output
      >;
      _hover?: DesignTokenProperties<'backgroundColor' | 'color', Output>;
      _disabled?: DesignTokenProperties<
        'backgroundColor' | 'borderColor' | 'color',
        Output
      >;
      _pressed?: DesignTokenProperties<
        'backgroundColor' | 'borderColor' | 'color',
        Output
      > & {
        _focus?: DesignTokenProperties<
          'backgroundColor' | 'borderColor' | 'color',
          Output
        >;
        _hover?: DesignTokenProperties<
          'backgroundColor' | 'borderColor' | 'boxShadow' | 'color',
          Output
        >;
      };
    };
    link?: DesignTokenProperties<'backgroundColor' | 'color'> & {
      _hover?: ToggleButtonStateTokens<Output>;
      _focus?: ToggleButtonStateTokens<Output>;
      _disabled?: ToggleButtonStateTokens<Output>;
      _pressed?: ToggleButtonStateTokens<Output> & {
        _hover?: ToggleButtonStateTokens<Output>;
        _focus?: ToggleButtonStateTokens<Output>;
      };
    };
  };

export const togglebutton: Required<ToggleButtonTokens<'default'>> = {
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
      color: { value: '{colors.background.primary.value}' },
      _focus: {
        backgroundColor: {
          value: '{colors.border.focus.value}',
        },
        borderColor: { value: '{colors.border.focus.value}' },
        color: { value: '{colors.background.primary.value}' },
      },
      _hover: {
        borderColor: { value: '{colors.brand.primary.60.value}' },
        backgroundColor: {
          value: '{colors.brand.primary.60.value}',
        },
        boxShadow: { value: '{colors.brand.primary.60.value}' },
        color: { value: '{colors.background.primary.value}' },
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
};
