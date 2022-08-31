import {
  DesignToken,
  FlexDirectionValue,
  ColorValue,
  BorderContrast,
  FontSizeValue,
  TextContrast,
} from '../types/designToken';

interface SelectFieldFocusTokens extends BorderContrast {}

interface SelectFieldLabelTokens extends TextContrast {}
export interface SelectFieldTokens extends BorderContrast {
  flexDirection: DesignToken<FlexDirectionValue>;
  color: DesignToken<ColorValue>;
  fontSize: DesignToken<FontSizeValue>;
  _focus: SelectFieldFocusTokens;
  label: SelectFieldLabelTokens;
}

export const selectfield: SelectFieldTokens = {
  backgroundColor: { value: '{components.fieldcontrol.backgroundColor}' },
  borderColor: { value: '{components.fieldcontrol.borderColor}' },
  color: { value: '{components.fieldcontrol.color}' },
  flexDirection: {
    value: 'column',
  },
  fontSize: { value: '{components.fieldcontrol.fontSize}' },
  _focus: {
    backgroundColor: {
      value: '{components.fieldcontrol.focus.backgroundColor}',
    },
    borderColor: { value: '{components.fieldcontrol._focus.borderColor}' },
  },
  label: {
    backgroundColor: { value: '{components.field.label.backgroundColor}' },
    color: { value: '{components.field.label.color}' },
  },
};
