/**
 * Helper function to test if something is a design token or not.
 * Used in the React component style props.
 *
 * @param arg - thing to test if it is a design token or not
 * @returns boolean
 */
export function isDesignToken(arg: unknown): arg is WebDesignToken {
  if (typeof arg === 'object') {
    return arg.hasOwnProperty('value');
  } else {
    return false;
  }
}

/**
 *
 */
export type DesignToken<ValueType = any> = {
  value: ValueType;
};

/**
 * A fully setup design token ready to be used in web platform.
 */
export type WebDesignToken<ValueType = any> = {
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
