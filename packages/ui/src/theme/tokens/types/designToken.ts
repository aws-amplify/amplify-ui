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

export type AnimationDurationValue = string;
export type AnimationTimingFunctionValue = string;
export type AlignItemsValue = string;
export type AlignContentValue = string;
export type BackgroundColorValue = ColorValue;
export type BorderColorValue = ColorValue;
export type BorderCollapseValue = string;
export type BorderRadiusValue = RadiusValue;
export type BorderStyleValue = string;
export type BorderWidthValue = SpaceValue;
export type BorderValue = string;
export type BoxSizingValue = string;
export type BoxShadowValue = ShadowValue;
export type CaptionSideValue = string;
export type ColorValue = string;
export type CursorValue = string;
export type DisplayValue = string;
export type FlexDirectionValue = string;
export type FlexValue = string;
export type FlexWrapValue = string;
export type FontSizeValue = string;
export type FontStyleValue = string;
export type FontValue = string;
export type FontWeightValue = string | number;
export type GapValue = string;
export type JustifyContentValue = string;
export type LineHeightValue = string | number;
export type ObjectFitValue = string;
export type OpacityValue = string;
export type OutlineOffsetValue = string;
export type OutlineWidthValue = string;
export type OutlineColorValue = string;
export type OutlineStyleValue = string;
export type PositionValue = string;
export type PointerEventsValue = string;
export type RadiusValue = string;
export type ShadowValue =
  | {
      offsetX: string;
      offsetY: string;
      blurRadius: string;
      spreadRadius?: string;
      color: string;
    }
  | string;
export type StrokeFilledValue = string;
export type StrokeEmptyValue = string;
export type StrokeLinecapValue = string;
export type SpaceValue = string;
export type TextAlignValue = string;
export type TimeValue = string;
export type TransformValue = string;
export type TransitionDurationValue = string;
export type TransitionPropertyValue = string;
export type TransitionTimingFunctionValue = string;
export type VerticalAlignValue = string;
export type WhiteSpaceValue = string;
export type WordBreakValue = string;
