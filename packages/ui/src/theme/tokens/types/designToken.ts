/**
 * a DesignToken can be either an object with a `value` key of `ValueType` or the `ValueType` itself
 */
export type DesignToken<ValueType = unknown> = { value: ValueType } | ValueType;

/**
 * A fully setup design token ready to be used in web platform.
 */
export type WebDesignToken<ValueType = unknown> = {
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
  /**
   * Token `ValueType`
   */
  value: ValueType;
};

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

/**
 * Mapping of design token value types to style property keys
 */
interface Properties {
  animationDuration: AnimationDurationValue;
  animationTimingFunction: AnimationTimingFunctionValue;
  alignItems: AlignItemsValue;
  alignContent: AlignContentValue;
  backgroundColor: BackgroundColorValue;
  borderColor: BorderColorValue;
  borderCollapse: BorderCollapseValue;
  borderRadius: BorderRadiusValue;
  borderStyle: BorderStyleValue;
  borderWidth: BorderWidthValue;
  border: BorderValue;
  bottom: SpaceValue;
  boxSizing: BoxSizingValue;
  boxShadow: BoxShadowValue;
  captionSide: CaptionSideValue;
  color: ColorValue;
  cursor: CursorValue;
  display: DisplayValue;
  flexDirection: FlexDirectionValue;
  flex: FlexValue;
  flexWrap: FlexWrapValue;
  fontStyle: FontStyleValue;
  font: FontValue;
  fontSize: FontSizeValue;
  fontWeight: FontWeightValue;
  gap: GapValue;
  height: SpaceValue;
  justifyContent: JustifyContentValue;
  left: SpaceValue;
  lineHeight: LineHeightValue;
  margin: SpaceValue;
  maxWidth: SpaceValue;
  objectFit: ObjectFitValue;
  opacity: OpacityValue;
  outlineOffset: OutlineOffsetValue;
  outlineWidth: OutlineWidthValue;
  outlineColor: OutlineColorValue;
  outlineStyle: OutlineStyleValue;
  padding: SpaceValue;
  paddingBlock: SpaceValue;
  paddingBottom: SpaceValue;
  paddingHorizontal: SpaceValue;
  paddingInline: SpaceValue;
  paddingLeft: SpaceValue;
  paddingRight: SpaceValue;
  paddingTop: SpaceValue;
  paddingVertical: SpaceValue;
  pointerEvents: PointerEventsValue;
  position: PositionValue;
  radius: RadiusValue;
  right: SpaceValue;
  shadow: ShadowValue;
  size: SpaceValue;
  strokeEmpty: StrokeEmptyValue;
  strokeFilled: StrokeFilledValue;
  strokeLinecap: StrokeLinecapValue;
  textAlign: TextAlignValue;
  time: TimeValue;
  top: SpaceValue;
  transform: TransformValue;
  transitionDuration: TransitionDurationValue;
  transitionProperty: TransitionPropertyValue;
  transitionTimingFunction: TransitionTimingFunctionValue;
  verticalAlign: VerticalAlignValue;
  whiteSpace: WhiteSpaceValue;
  width: SpaceValue;
  wordBreak: WordBreakValue;
}

type PropertyKey = keyof Properties;
type OutputKey = 'strict' | unknown;

/**
 * Return interface with all types optional for custom theme input
 */
type OptionalDesignTokenProperties<Keys extends PropertyKey> = Partial<{
  [Key in Keys]?: DesignToken<Properties[Key]>;
}>;

/**
 * Return interface with all types required for strict theme output
 */
type RequiredDesignTokenProperties<Keys extends PropertyKey> = {
  [Key in Keys]: WebDesignToken<Properties[Key]>;
};

/**
 * Utility for creating interfaces for components from supported CSS property keys
 */
export type DesignTokenProperties<
  Keys extends PropertyKey,
  Output extends OutputKey = unknown
> = Output extends 'strict'
  ? RequiredDesignTokenProperties<Keys>
  : OptionalDesignTokenProperties<Keys>;

type PlatformKey = 'web' | 'mobile' | unknown;
type PropKey = string | number;

type RequiredTokenValues<
  PropertyValueKey extends PropKey,
  PropertyValue,
  Platform extends PlatformKey = unknown
> = Record<
  PropertyValueKey,
  Platform extends 'mobile' ? PropertyValue : WebDesignToken<PropertyValue>
>;

type OptionalTokenValues<
  PropertyValueKey extends PropKey,
  PropertyValue,
  Platform extends PlatformKey = unknown
> = Partial<
  Record<
    PropertyValueKey,
    Platform extends 'mobile' ? PropertyValue : DesignToken<PropertyValue>
  >
>;

/**
 * Utility for creating token interfaces in `Theme`
 */
export type DesignTokenValues<
  PropertyValueKey extends PropKey,
  PropertyValue,
  Output extends OutputKey = unknown,
  Platform extends PlatformKey = unknown
> = Output extends 'strict'
  ? RequiredTokenValues<PropertyValueKey, PropertyValue, Platform>
  : OptionalTokenValues<PropertyValueKey, PropertyValue, Platform>;
