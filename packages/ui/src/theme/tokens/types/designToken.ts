import { Properties } from 'csstype';

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
export type BorderWidthValue<
  Platform extends PlatformKey = unknown,
  Output extends OutputVariantKey = unknown
> = Output extends 'required'
  ? Platform extends 'react-native'
    ? number
    : SpaceValue
  : SpaceValue;
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

export type FontSizeValue<
  Platform extends PlatformKey = unknown,
  Output extends OutputVariantKey = unknown
> = Output extends 'required'
  ? Platform extends 'react-native'
    ? number
    : string
  : string;

export type FontStyleValue = string;
export type FontValue = string;
export type FontWeightValue<
  Platform extends PlatformKey = unknown,
  Output extends OutputVariantKey = unknown
> = Output extends 'required'
  ? Platform extends 'react-native'
    ?
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900'
    : string | number
  : string | number;
export type GapValue = string;
export type JustifyContentValue = string;
export type LineHeightValue = string | number;
export type ObjectFitValue = string;

// `opacity` values are `string` for web and `number` for react-native
export type OpacityValue<
  Platform extends PlatformKey = unknown,
  Output extends OutputVariantKey = unknown
> = Output extends 'required'
  ? Platform extends 'react-native'
    ? number
    : string
  : string;

export type OutlineOffsetValue = string;
export type OutlineWidthValue = string;
export type OutlineColorValue = string;
export type OutlineStyleValue = string;
export type PositionValue = string;
export type PointerEventsValue = string;

export type RadiusValue<
  Platform extends PlatformKey = unknown,
  Output extends OutputVariantKey = unknown
> = Output extends 'required'
  ? Platform extends 'react-native'
    ? number
    : string
  : string;

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
export type StrokeWidthValue = string;

export type SpaceValue<Platform extends PlatformKey = unknown> =
  Platform extends 'react-native' ? string | number : string;

export type TextAlignValue = string;

export type TimeValue<
  Platform extends PlatformKey = unknown,
  Output extends OutputVariantKey = unknown
> = Output extends 'required'
  ? Platform extends 'react-native'
    ? number
    : string
  : string;

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
interface TokenStandardProperties {
  animationDuration: AnimationDurationValue;
  animationTimingFunction: AnimationTimingFunctionValue;
  alignItems: AlignItemsValue;
  alignContent: AlignContentValue;
  backgroundColor: BackgroundColorValue;
  borderBlockEnd: BorderValue;
  borderBlockEndColor: ColorValue;
  borderBlockStart: BorderValue;
  borderCollapse: BorderCollapseValue;
  borderColor: BorderColorValue;
  borderInlineEnd: BorderValue;
  borderInlineStart: BorderValue;
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
  fill: DesignToken<ColorValue>;
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
  marginLeft: SpaceValue;
  marginRight: SpaceValue;
  marginBlockStart: SpaceValue;
  maxHeight: SpaceValue;
  maxWidth: SpaceValue;
  minHeight: SpaceValue;
  minWidth: SpaceValue;
  objectFit: ObjectFitValue;
  objectPosition: PositionValue;
  opacity: OpacityValue;
  outlineOffset: OutlineOffsetValue;
  outlineWidth: OutlineWidthValue;
  outlineColor: OutlineColorValue;
  outlineStyle: OutlineStyleValue;
  padding: SpaceValue;
  paddingBlock: SpaceValue;
  paddingBlockEnd: SpaceValue;
  paddingBlockStart: SpaceValue;
  paddingBottom: SpaceValue;
  paddingInline: SpaceValue;
  paddingInlineEnd: SpaceValue;
  paddingInlineStart: SpaceValue;
  paddingLeft: SpaceValue;
  paddingRight: SpaceValue;
  paddingTop: SpaceValue;
  pointerEvents: PointerEventsValue;
  position: PositionValue;
  right: SpaceValue;
  strokeLinecap: StrokeLinecapValue;
  strokeWidth: StrokeWidthValue;
  textAlign: TextAlignValue;
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

/**
 * Custom style tokens with non-css property names
 */
interface TokenCustomProperties {
  borderBottomLeftRadius: RadiusValue;
  borderBottomRightRadius: RadiusValue;
  borderEndEndRadius: RadiusValue;
  borderEndStartRadius: RadiusValue;
  borderStartEndRadius: RadiusValue;
  borderStartStartRadius: RadiusValue;
  borderTopLeftRadius: RadiusValue;
  borderTopRightRadius: RadiusValue;
  duration: TimeValue;
  endColor: ColorValue;
  marginTop: SpaceValue;
  paddingHorizontal: SpaceValue;
  paddingVertical: SpaceValue;
  shadow: ShadowValue;
  size: SpaceValue;
  startColor: ColorValue;
  strokeEmpty: StrokeEmptyValue;
  strokeFilled: StrokeFilledValue;
  time: TimeValue;
}

interface TokenProperties
  extends TokenStandardProperties,
    TokenCustomProperties {}

type TokenProperty = keyof TokenProperties;

type Property =
  | Extract<keyof Properties, TokenProperty>
  | keyof TokenCustomProperties;

export type OutputVariantKey = 'default' | 'optional' | 'required' | unknown;

/**
 * Return interface with all types optional for custom theme input
 */
type OptionalDesignTokenProperties<Keys extends Property> = Partial<{
  [Key in Keys]?: DesignToken<TokenProperties[Key]>;
}>;

/**
 * Return interface with all types required for strict theme output
 */
type RequiredDesignTokenProperties<Keys extends TokenProperty> = {
  [Key in Keys]: WebDesignToken<TokenProperties[Key]>;
};

/**
 * Return interface with all types required for strict theme output
 */
type DefaultDesignTokenProperties<Keys extends TokenProperty> = Required<{
  [Key in Keys]: DesignToken<TokenProperties[Key]>;
}>;

/**
 * Utility for creating interfaces for components from supported CSS property keys
 */
export type DesignTokenProperties<
  Keys extends TokenProperty,
  Output extends OutputVariantKey = unknown
> = Output extends 'required'
  ? RequiredDesignTokenProperties<Keys>
  : Output extends 'optional'
  ? OptionalDesignTokenProperties<Keys>
  : DefaultDesignTokenProperties<Keys>;

export type PlatformKey = 'web' | 'react-native' | 'android' | 'ios' | unknown;

// scales can be keyed with `number`
type PropKey = string | number;

type RequiredTokenValues<
  PropertyValueKey extends PropKey,
  PropertyValue,
  Platform extends PlatformKey = unknown
> = Record<
  PropertyValueKey,
  Platform extends 'react-native'
    ? PropertyValue
    : WebDesignToken<PropertyValue>
>;

type OptionalTokenValues<
  PropertyValueKey extends PropKey,
  PropertyValue,
  Platform extends PlatformKey = unknown
> = Partial<Record<PropertyValueKey, DesignToken<PropertyValue>>>;

type DefaultTokenValues<
  PropertyValueKey extends PropKey,
  PropertyValue,
  Platform extends PlatformKey = unknown
> = Required<Record<PropertyValueKey, DesignToken<PropertyValue>>>;

/**
 * Utility for creating token interfaces in `Theme`
 */
export type DesignTokenValues<
  PropertyValueKey extends PropKey,
  PropertyValue,
  Output extends OutputVariantKey = unknown,
  Platform extends PlatformKey = unknown
> = Output extends 'required'
  ? RequiredTokenValues<PropertyValueKey, PropertyValue, Platform>
  : Output extends 'optional'
  ? OptionalTokenValues<PropertyValueKey, PropertyValue, Platform>
  : DefaultTokenValues<PropertyValueKey, PropertyValue, Platform>;
