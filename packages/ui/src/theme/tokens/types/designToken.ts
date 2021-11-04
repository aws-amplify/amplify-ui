import { Property } from 'csstype';

export function isDesignToken(arg: any): arg is WebDesignToken {
  return arg.value !== undefined;
}

export type DesignToken<ValueType = any> = {
  value: ValueType;
};

/**
 *
 */
export type WebDesignToken<ValueType = any> = {
  /**
   * Transformed value
   */
  value: ValueType;
  /**
   * Name of the design token
   */
  name: string;
  /**
   * Object path of the design token. Used for constructing the name
   */
  path: Array<string>;
  /**
   * Original (unresolved, untransformed) value of the design token
   */
  original: ValueType;
  /**
   * The wrapped CSS variable name of this design token, for example
   * `var(--amplify-colors-font-primary)`
   */
  cssReference: string;
  /**
   *
   */
  toString(): string;
} & DesignToken<ValueType>;

/**
 * When defining a design token, you only need to have a `value`
 */
// export type DesignTokenInput<ValueType = any> = Pick<DesignToken<ValueType>, "value">;
// export type InputDesignToken<ValueType = any> = Pick<DesignToken<ValueType>, "value">;

export type ColorValue = string | Property.Color;
export type BorderWidthValue = string | Property.BorderWidth;
export type FontValue = string | Property.FontFamily;
export type FontSizeValue = string | Property.FontSize;
export type FontWeightValue = number | Property.FontWeight;
export type LineHeightValue = string | Property.LineHeight;
export type OpacityValue = string;
export type OutlineOffsetValue = string;
export type OutlineWidthValue = string;
export type RadiusValue = string;
export type ShadowValue = {
  offsetX: string;
  offsetY: string;
  blurRadius: string;
  spreadRadius?: string;
  color: string;
};
export type SpaceValue = string;
export type TimeValue = string;
export type TransformValue = string;
