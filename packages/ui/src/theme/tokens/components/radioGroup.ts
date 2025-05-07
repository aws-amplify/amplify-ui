import type {
  DesignTokenProperties,
  OutputVariantKey,
} from '../types/designToken';

export type RadioGroupTokens<Output extends OutputVariantKey> = {
  radio?: DesignTokenProperties<
    'borderWidth' | 'borderColor' | 'backgroundColor',
    Output
  > & {
    _checked?: DesignTokenProperties<'color', Output>;
    label?: DesignTokenProperties<'color', Output>;
  };
  legend?: DesignTokenProperties<'color' | 'fontWeight', Output>;
};

export const radiogroup: Required<RadioGroupTokens<'default'>> = {
  radio: {
    borderWidth: { value: '{components.radio.button.borderWidth}' },
    borderColor: { value: '{components.radio.button.borderColor}' },
    backgroundColor: { value: '{components.radio.button.backgroundColor}' },
    _checked: {
      color: { value: '{components.radio.button._checked.color}' },
    },
    label: {
      color: { value: '{components.radio.label.color}' },
    },
  },
  legend: {
    color: { value: '{components.fieldset.legend.color}' },
    fontWeight: { value: '{fontWeights.normal}' },
  },
};
