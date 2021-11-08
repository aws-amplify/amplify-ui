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
  toString(): string;
} & DesignToken<ValueType>;

export type ColorValue = string;
export type BorderWidthValue = string;
export type FontValue = string;
export type FontSizeValue = string;
export type FontWeightValue = number;
export type LineHeightValue = string;
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
