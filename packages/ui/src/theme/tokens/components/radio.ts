import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type RadioButtonSizeTokens<Output> = DesignTokenProperties<
  'width' | 'height',
  Output
>;

export type RadioTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'alignItems' | 'justifyContent' | 'gap', Output> & {
    _disabled?: DesignTokenProperties<'cursor', Output>;
    button?: DesignTokenProperties<
      | 'alignItems'
      | 'justifyContent'
      | 'width'
      | 'height'
      | 'boxSizing'
      | 'borderWidth'
      | 'borderStyle'
      | 'borderRadius'
      | 'borderColor'
      | 'color'
      | 'backgroundColor'
      | 'transitionProperty'
      | 'transitionDuration'
      | 'outlineColor'
      | 'outlineStyle'
      | 'outlineWidth'
      | 'outlineOffset'
      | 'padding',
      Output
    > & {
      small?: RadioButtonSizeTokens<Output>;
      large?: RadioButtonSizeTokens<Output>;
      _checked?: DesignTokenProperties<'color', Output> & {
        _disabled?: DesignTokenProperties<'color', Output>;
      };
      _focus?: DesignTokenProperties<'borderColor' | 'boxShadow', Output>;
      _error?: DesignTokenProperties<'borderColor', Output> & {
        _focus?: DesignTokenProperties<'boxShadow', Output>;
      };
      _disabled?: DesignTokenProperties<
        'borderColor' | 'backgroundColor',
        Output
      >;
    };
    label?: DesignTokenProperties<'color', Output> & {
      _disabled?: DesignTokenProperties<'color', Output>;
    };
  };

export const radio: Required<RadioTokens<'default'>> = {
  alignItems: { value: 'center' },
  justifyContent: { value: 'flex-start' },
  gap: { value: 'inherit' },
  _disabled: { cursor: { value: 'not-allowed' } },
  button: {
    alignItems: { value: 'center' },
    justifyContent: { value: 'center' },
    width: { value: '{fontSizes.medium.value}' },
    height: { value: '{fontSizes.medium.value}' },
    boxSizing: { value: 'border-box' },
    borderWidth: { value: '{borderWidths.medium.value}' },
    borderStyle: { value: 'solid' },
    borderRadius: { value: '50%' },
    borderColor: { value: '{colors.border.primary.value}' },
    color: { value: '{colors.background.primary.value}' },
    backgroundColor: { value: '{colors.background.primary.value}' },
    transitionProperty: { value: 'all' },
    transitionDuration: { value: '{time.medium.value}' },
    outlineColor: { value: '{colors.transparent.value}' },
    outlineStyle: { value: 'solid' },
    outlineWidth: { value: '{outlineWidths.medium.value}' },
    outlineOffset: { value: '{outlineOffsets.medium.value}' },
    // We want the dot inside the border to be a border-width from the border
    padding: { value: '{borderWidths.medium.value}' },

    small: {
      width: { value: '{fontSizes.small.value}' },
      height: { value: '{fontSizes.small.value}' },
    },
    large: {
      width: { value: '{fontSizes.large.value}' },
      height: { value: '{fontSizes.large.value}' },
    },

    _checked: {
      color: {
        value: '{colors.brand.primary.80.value}',
      },
      _disabled: { color: { value: '{colors.background.disabled.value}' } },
    },

    _focus: {
      borderColor: { value: '{colors.border.focus.value}' },
      boxShadow: { value: '{components.fieldcontrol._focus.boxShadow.value}' },
    },

    _error: {
      borderColor: { value: '{colors.border.error.value}' },
      _focus: {
        boxShadow: {
          value: '{components.fieldcontrol._error._focus.boxShadow.value}',
        },
      },
    },

    _disabled: {
      borderColor: { value: '{colors.border.disabled.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
    },
  },

  label: {
    color: { value: '{components.text.color.value}' },
    _disabled: {
      color: {
        value: '{colors.font.disabled.value}',
      },
    },
  },
};
