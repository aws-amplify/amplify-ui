import { Property } from 'csstype';
import { WebDesignToken } from '@aws-amplify/ui';

import type {
  BoxShadowKeys,
  ColorKeys,
  FontFamilyKeys,
  FontSizeKeys,
  FontWeightKeys,
  LineHeightKeys,
  OpacityKeys,
  RadiiKeys,
  SpaceKeys,
  TransformKeys,
} from './theme';
import { FlexItemStyleProps, FlexContainerStyleProps } from './flex';
import { GridItemStyleProps, GridContainerStyleProps } from './grid';
import { ImageStyleProps } from './image';
import { TextAreaStyleProps } from './textArea';

/**
 * @description
 * Extract style compatible types (string literal | number | any string)
 */
export type StyleProp<PropertyType> =
  | (PropertyType extends number
      ? number
      : PropertyType extends string | WebDesignToken
      ? PropertyType
      : never)
  | (string & {});

export interface ResponsiveObject<PropertyType> {
  base?: PropertyType;
  small?: PropertyType;
  medium?: PropertyType;
  large?: PropertyType;
  xl?: PropertyType;
  xxl?: PropertyType;
}

/**
 * @description
 * Allows a style prop to be the property type
 * or a design token of that property type.
 */
export type StyleToken<PropertyType> =
  | PropertyType
  | WebDesignToken<PropertyType>;

export type ResponsiveStyle<PropertyType> =
  | StyleProp<PropertyType>
  | StyleProp<PropertyType>[]
  | ResponsiveObject<StyleProp<PropertyType>>;

export interface BaseStyleProps extends FlexItemStyleProps, GridItemStyleProps {
  /**
   * @description
   * Overrides a grid or flex item's align-items value. In Grid, it aligns the item inside the grid area. In Flexbox, it aligns the item on the cross axis.
   * @see[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self)
   */
  alignSelf?: ResponsiveStyle<StyleToken<Property.AlignSelf>>;

  /**
   * @description
   * Sets the background color of an element.
   * @see[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)
   */
  backgroundColor?: ResponsiveStyle<
    ColorKeys<StyleToken<Property.BackgroundColor>>
  >;

  /**
   * @description
   * Sets one or more background images on an element.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)
   */
  backgroundImage?: ResponsiveStyle<StyleToken<Property.BackgroundImage>>;

  /**
   * @description
   * Shorthand CSS property that sets an element's border-width, border-style, and border-color.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/border)
   */
  border?: ResponsiveStyle<StyleToken<Property.Border>>;

  /**
   * @description
   * Rounds the corners of an element's outer border edge.
   * You can set a single radius to make circular corners, or two radii to make elliptical corners.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)
   */
  borderRadius?: ResponsiveStyle<RadiiKeys<StyleToken<Property.BorderRadius>>>;

  /**
   * @description
   * Participates in setting the vertical position of a positioned element.
   * It has no effect on non-positioned elements.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/bottom)
   */
  bottom?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Bottom>>>;

  /**
   * @description
   * Adds shadow effects around an element's frame. You can set multiple effects separated by commas.
   * A box shadow is described by X and Y offsets relative to the element, blur and spread radius, and color.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
   */
  boxShadow?: ResponsiveStyle<BoxShadowKeys<StyleToken<Property.BoxShadow>>>;

  /**
   * @description
   * Sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value.
   * `currentcolor` may be used as an indirect value on other properties and is the default for other color properties, such as border-color.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color)
   */
  color?: ResponsiveStyle<ColorKeys<StyleToken<Property.Color>>>;

  /**
   * @description
   * Sets whether an element is treated as a block or inline element and the layout used for its children, such as flow layout, grid or flex.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
   */
  display?: ResponsiveStyle<StyleToken<Property.Display>>;

  /**
   * @description
   * Specifies a prioritized list of one or more font family names and/or generic family names for the selected element.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)
   */
  fontFamily?: ResponsiveStyle<FontFamilyKeys<StyleToken<Property.FontFamily>>>;

  /**
   * @description
   * Sets the size of the font. Changing the font size also updates the sizes of the font size-relative <length> units, such as em, ex, and so forth.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)
   */
  fontSize?: ResponsiveStyle<FontSizeKeys<StyleToken<Property.FontSize>>>;

  /**
   * @description
   * Sets whether a font should be styled with a normal, italic, or oblique face from its font-family.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style)
   */
  fontStyle?: ResponsiveStyle<StyleToken<Property.FontStyle>>;

  /**
   * @description
   * Sets the weight (or boldness) of the font. The weights available depend on the font-family that is currently set.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)
   */
  fontWeight?: ResponsiveStyle<FontWeightKeys<StyleToken<Property.FontWeight>>>;

  /**
   * @description
   * specifies the height of an element. By default, the property defines the height of the content area.
   * If box-sizing is set to border-box, however, it instead determines the height of the border area.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/height)
   */
  height?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Height>>>;

  /**
   * @description
   * Participates in specifying the horizontal position of a positioned element. It has no effect on non-positioned elements.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/left)
   */
  left?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Left>>>;

  /**
   * @description
   * Sets the horizontal spacing behavior between text characters.
   * This value is added to the natural spacing between characters while rendering the text.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing)
   */
  letterSpacing?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.LetterSpacing>>
  >;

  /**
   * @description
   * Sets the height of a line box. It's commonly used to set the distance between lines of text.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)
   */
  lineHeight?: ResponsiveStyle<LineHeightKeys<StyleToken<Property.LineHeight>>>;

  /**
   * @description
   * Shorthand CSS property that sets the margin area on all four sides of an element.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)
   */
  margin?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Margin>>>;

  /**
   * @description
   * Shorthand CSS property that defines the logical block start and end margins of an element,
   * which maps to physical margins depending on the element's writing mode, directionality, and text orientation.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block)
   */
  marginBlock?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginBlock>>>;

  /**
   * @description
   * Defines the logical block end margin of an element,
   * which maps to a physical margin depending on the element's writing mode, directionality, and text orientation.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block-end)
   */
  marginBlockEnd?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.MarginBlockEnd>>
  >;

  /**
   * @description
   * Defines the logical block start margin of an element,
   * which maps to a physical margin depending on the element's writing mode, directionality, and text orientation.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block-start)
   */
  marginBlockStart?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.MarginBlockStart>>
  >;

  /**
   * @description
   * Sets the margin area on the bottom of an element.
   * A positive value places it farther from its neighbors, while a negative value places it closer.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom)
   */
  marginBottom?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginBottom>>>;

  /**
   * @description
   * Shorthand CSS property that defines both the logical inline start and end margins of an element,
   * which maps to physical margins depending on the element's writing mode, directionality, and text orientation.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline)
   */
  marginInline?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginInline>>>;

  /**
   * @description
   * Defines the logical inline end margin of an element,
   * which maps to a physical margin depending on the element's writing mode, directionality, and text orientation.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-end)
   */
  marginInlineEnd?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.MarginInlineEnd>>
  >;

  /**
   * @description
   * Defines the logical inline start margin of an element,
   * which maps to a physical margin depending on the element's writing mode, directionality, and text orientation.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-start)
   */
  marginInlineStart?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.MarginInlineStart>>
  >;

  /**
   * @description
   * Sets the margin area on the left side of an element.
   * A positive value places it farther from its neighbors, while a negative value places it closer.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left)
   */
  marginLeft?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginLeft>>>;

  /**
   * @description
   * Sets the margin area on the right side of an element.
   * A positive value places it farther from its neighbors, while a negative value places it closer.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right)
   */
  marginRight?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginRight>>>;

  /**
   * @description
   * Sets the margin area on the top of an element.
   * A positive value places it farther from its neighbors, while a negative value places it closer.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top)
   */
  marginTop?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginTop>>>;

  /**
   * @description
   * Sets the maximum height of an element.
   * It prevents the used value of the height property from becoming larger than the value specified for max-height.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height)
   */
  maxHeight?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MaxHeight>>>;

  /**
   * @description
   * Sets the maximum width of an element.
   * It prevents the used value of the width property from becoming larger than the value specified by max-width.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width)
   */
  maxWidth?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MaxWidth>>>;

  /**
   * @description
   * Sets the minimum height of an element.
   * It prevents the used value of the height property from becoming smaller than the value specified for min-height.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height)
   */
  minHeight?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MinHeight>>>;

  /**
   * @description
   * Sets the minimum width of an element.
   * It prevents the used value of the width property from becoming smaller than the value specified for min-width.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width)
   */
  minWidth?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MinWidth>>>;

  /**
   * @description
   * Sets the opacity of an element.
   * Opacity is the degree to which content behind an element is hidden, and is the opposite of transparency.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)
   */
  opacity?: ResponsiveStyle<OpacityKeys<StyleToken<Property.Opacity>>>;

  /**
   * @description
   * Shorthand CSS property that sets the desired behavior for an element's overflow
   * — i.e. when an element's content is too big to fit in its block formatting context — in both directions.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: ResponsiveStyle<StyleToken<Property.Overflow>>;

  /**
   * @description
   * Shorthand CSS property that sets the padding area on all four sides of an element at once.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)
   */
  padding?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Padding>>>;

  /**
   * @description
   * Shorthand CSS property that defines the logical block start and end padding of an element,
   * which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block)
   */
  paddingBlock?: ResponsiveStyle<SpaceKeys<StyleToken<Property.PaddingBlock>>>;

  /**
   * @description
   * Defines the logical block end padding of an element,
   * which maps to a physical padding depending on the element's writing mode, directionality, and text orientation.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block-end)
   */
  paddingBlockEnd?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.PaddingBlockEnd>>
  >;

  /**
   * @description
   * Defines the logical block start padding of an element,
   * which maps to a physical padding depending on the element's writing mode, directionality, and text orientation.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block-start)
   */
  paddingBlockStart?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.PaddingBlockStart>>
  >;

  /**
   * @description
   * Sets the height of the padding area on the bottom of an element.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom)
   */
  paddingBottom?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.PaddingBottom>>
  >;

  /**
   * @description
   * Shorthand CSS property that defines the logical inline start and end padding of an element,
   * which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline)
   */
  paddingInline?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.PaddingInline>>
  >;

  /**
   * @description
   * Defines the logical inline end padding of an element,
   * which maps to a physical padding depending on the element's writing mode, directionality, and text orientation.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-end)
   */
  paddingInlineEnd?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.PaddingInlineEnd>>
  >;

  /**
   * @description
   * Defines the logical inline start padding of an element,
   * which maps to a physical padding depending on the element's writing mode, directionality, and text orientation.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-start)
   */
  paddingInlineStart?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.PaddingInlineStart>>
  >;

  /**
   * @description
   * Sets the width of the padding area to the left of an element.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left)
   */
  paddingLeft?: ResponsiveStyle<SpaceKeys<StyleToken<Property.PaddingLeft>>>;

  /**
   * @description
   * Sets the width of the padding area on the right of an element.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right)
   */
  paddingRight?: ResponsiveStyle<SpaceKeys<StyleToken<Property.PaddingRight>>>;

  /**
   * @description
   * Sets the height of the padding area on the top of an element.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top)
   */
  paddingTop?: ResponsiveStyle<SpaceKeys<StyleToken<Property.PaddingTop>>>;

  /**
   * @description
   * Sets how an element is positioned in a document.
   * The top, right, bottom, and left properties determine the final location of positioned elements.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
   */
  position?: ResponsiveStyle<StyleToken<Property.Position>>;

  /**
   * @description
   * Participates in specifying the horizontal position of a positioned element. It has no effect on non-positioned elements.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/right)
   */
  right?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Right>>>;

  /**
   * @description
   * Sets the horizontal alignment of the content inside a block element or table-cell box.
   * This means it works like vertical-align but in the horizontal direction.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)
   */
  textAlign?: ResponsiveStyle<StyleToken<Property.TextAlign>>;

  /**
   * @description
   * Shorthand CSS property that sets the appearance of decorative lines on text.
   * It is a shorthand for text-decoration-line, text-decoration-color, text-decoration-style, and the newer text-decoration-thickness property.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration)
   */
  textDecoration?: ResponsiveStyle<StyleToken<Property.TextDecoration>>;

  /**
   * @description
   * Specifies how to capitalize an element's text. It can be used to make text
   * appear in all-uppercase or all-lowercase, or with each word capitalized.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform)
   */
  textTransform?: ResponsiveStyle<StyleToken<Property.TextTransform>>;

  /**
   * @description
   * Participates in specifying the vertical position of a positioned element. It has no effect on non-positioned elements.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/top)
   */
  top?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Top>>>;

  /**
   * @description
   * Lets you rotate, scale, skew, or translate an element. It modifies the coordinate space of the CSS visual formatting model.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
   */
  transform?: ResponsiveStyle<TransformKeys<StyleToken<Property.Transform>>>;

  /**
   * @description
   * Sets the origin for an element's transformations.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)
   */
  transformOrigin?: ResponsiveStyle<StyleToken<Property.TransformOrigin>>;

  /**
   * @description
   * Sets an element's width. By default, it sets the width of the content area,
   * but if box-sizing is set to border-box, it sets the width of the border area.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/width)
   */
  width?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Width>>>;

  /**
   * @description
   * Sets how white space inside an element is handled.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   */
  whiteSpace?: ResponsiveStyle<StyleToken<Property.WhiteSpace>>;
}

export interface CSSLayoutStyleProps {
  /**
   * @description
   * Sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis. In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
   */
  alignItems?: ResponsiveStyle<Property.AlignItems>;

  /**
   * @description
   * Sets the distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)
   */
  alignContent?: ResponsiveStyle<Property.AlignContent>;

  /**
   * @description
   * Defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)
   */
  justifyContent?: ResponsiveStyle<Property.JustifyContent>;

  /**
   * @description
   * Controls the spacing between child components. Shorthand for rowGap and columnGap.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)
   */
  gap?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Gap>>>;

  /**
   * @description
   * Controls the spacing between Flex/Grid child columns
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)
   */
  columnGap?: ResponsiveStyle<SpaceKeys<StyleToken<Property.GridColumnGap>>>;

  /**
   * @description
   * Controls the spacing between Flex/Grid child rows
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)
   */
  rowGap?: ResponsiveStyle<SpaceKeys<StyleToken<Property.RowGap>>>;
}

export interface AllStyleProps
  extends BaseStyleProps,
    ImageStyleProps,
    FlexContainerStyleProps,
    GridContainerStyleProps,
    TextAreaStyleProps {}

export type AllStylePropKey = keyof AllStyleProps;

export type ComponentPropToStyleProp = Required<{
  [key in AllStylePropKey]: keyof React.CSSProperties;
}>;

/**
 * @internal May be removed in a future version
 * Maps from component style props to React `style` props
 * Note: Primarily needed to map from component style props that don't match CSS Properties directly
 * such as wrap => flexWrap and direction => flexDirection
 */
export const ComponentPropsToStylePropsMap: ComponentPropToStyleProp = {
  alignContent: 'alignContent',
  alignItems: 'alignItems',
  alignSelf: 'alignSelf',
  area: 'gridArea',
  autoColumns: 'gridAutoColumns',
  autoFlow: 'gridAutoFlow',
  autoRows: 'gridAutoRows',
  backgroundColor: 'backgroundColor',
  backgroundImage: 'backgroundImage',
  basis: 'flexBasis',
  border: 'border',
  borderRadius: 'borderRadius',
  bottom: 'bottom',
  boxShadow: 'boxShadow',
  color: 'color',
  column: 'gridColumn',
  columnEnd: 'gridColumnEnd',
  columnGap: 'columnGap',
  columnSpan: 'gridColumn', // Will set gridColumn if no `row` prop given
  columnStart: 'gridColumnStart',
  direction: 'flexDirection',
  display: 'display',
  flex: 'flex',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontStyle: 'fontStyle',
  fontWeight: 'fontWeight',
  gap: 'gap',
  grow: 'flexGrow',
  height: 'height',
  justifyContent: 'justifyContent',
  left: 'left',
  letterSpacing: 'letterSpacing',
  lineHeight: 'lineHeight',
  margin: 'margin',
  marginBlock: 'marginBlock',
  marginBlockEnd: 'marginBlockEnd',
  marginBlockStart: 'marginBlockStart',
  marginBottom: 'marginBlockEnd',
  marginInline: 'marginInline',
  marginInlineEnd: 'marginInlineEnd',
  marginInlineStart: 'marginInlineStart',
  marginLeft: 'marginInlineStart',
  marginRight: 'marginInlineEnd',
  marginTop: 'marginBlockStart',
  maxHeight: 'maxHeight',
  maxWidth: 'maxWidth',
  minHeight: 'minHeight',
  minWidth: 'minWidth',
  objectFit: 'objectFit',
  objectPosition: 'objectPosition',
  opacity: 'opacity',
  order: 'order',
  overflow: 'overflow',
  padding: 'padding',
  paddingBlock: 'paddingBlock',
  paddingBlockEnd: 'paddingBlockEnd',
  paddingBlockStart: 'paddingBlockStart',
  paddingBottom: 'paddingBlockEnd',
  paddingInline: 'paddingInline',
  paddingInlineEnd: 'paddingInlineEnd',
  paddingInlineStart: 'paddingInlineStart',
  paddingLeft: 'paddingInlineStart',
  paddingRight: 'paddingInlineEnd',
  paddingTop: 'paddingBlockStart',
  position: 'position',
  resize: 'resize',
  right: 'right',
  row: 'gridRow',
  rowEnd: 'gridRowEnd',
  rowGap: 'rowGap',
  rowSpan: 'gridRow', // Will set gridRow if no `row` prop given
  rowStart: 'gridRowStart',
  shrink: 'flexShrink',
  templateAreas: 'gridTemplateAreas',
  templateColumns: 'gridTemplateColumns',
  templateRows: 'gridTemplateRows',
  textAlign: 'textAlign',
  textDecoration: 'textDecoration',
  textTransform: 'textTransform',
  top: 'top',
  transform: 'transform',
  transformOrigin: 'transformOrigin',
  width: 'width',
  whiteSpace: 'whiteSpace',
  wrap: 'flexWrap',
};

/**
 * @internal May be removed in a future version
 */
export const ComponentPropsToStylePropsMapKeys = Object.keys(
  ComponentPropsToStylePropsMap
) as Array<keyof ComponentPropToStyleProp>;
