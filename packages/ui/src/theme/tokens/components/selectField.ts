import {
  DesignToken,
  FlexDirectionValue,
  ColorValue,
  BorderColorValue,
  FontSizeValue,
} from '../types/designToken';

export interface SelectFieldTokens {
  flexDirection: DesignToken<FlexDirectionValue>;
  color: DesignToken<ColorValue>;
  borderColor: DesignToken<BorderColorValue>;
  fontSize: DesignToken<FontSizeValue>;
  _focus: {
    borderColor: DesignToken<BorderColorValue>;
  };
  label: {
    color: DesignToken<ColorValue>;
  };
}

export const selectfield: SelectFieldTokens = {
  borderColor: { value: '{components.fieldcontrol.borderColor}' },
  color: { value: '{components.fieldcontrol.color}' },
  flexDirection: {
    value: 'column',
  },
  fontSize: { value: '{components.fieldcontrol.fontSize}' },
  _focus: {
    borderColor: { value: '{components.fieldcontrol._focus.borderColor}' },
  },
  label: {
    color: { value: '{components.field.label.color}' },
  },
};
