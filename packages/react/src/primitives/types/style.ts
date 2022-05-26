import { Property } from 'csstype';
import { WebDesignToken } from '@aws-amplify/ui';

import { FlexItemStyleProps, FlexContainerStyleProps } from './flex';
import { GridItemStyleProps, GridContainerStyleProps } from './grid';
import { ImageStyleProps } from './image';
import { TextAreaStyleProps } from './textArea';

/**
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
 * Allows a style prop to be the property type
 * or a design token of that property type.
 */
type StyleToken<PropertyType> = PropertyType | WebDesignToken<PropertyType>;

export type ResponsiveStyle<PropertyType> =
  | StyleProp<PropertyType>
  | StyleProp<PropertyType>[]
  | ResponsiveObject<StyleProp<PropertyType>>;

export interface BaseStyleProps extends FlexItemStyleProps, GridItemStyleProps {
  alignSelf?: ResponsiveStyle<StyleToken<Property.AlignSelf>>;
  backgroundColor?: ResponsiveStyle<StyleToken<Property.BackgroundColor>>;
  backgroundImage?: ResponsiveStyle<StyleToken<Property.BackgroundImage>>;
  border?: ResponsiveStyle<StyleToken<Property.Border>>;
  borderRadius?: ResponsiveStyle<StyleToken<Property.BorderRadius>>;
  bottom?: ResponsiveStyle<StyleToken<Property.Bottom>>;
  boxShadow?: ResponsiveStyle<StyleToken<Property.BoxShadow>>;
  color?: ResponsiveStyle<StyleToken<Property.Color>>;
  display?: ResponsiveStyle<StyleToken<Property.Display>>;
  fontFamily?: ResponsiveStyle<StyleToken<Property.FontFamily>>;
  fontSize?: ResponsiveStyle<StyleToken<Property.FontSize>>;
  fontStyle?: ResponsiveStyle<StyleToken<Property.FontStyle>>;
  fontWeight?: ResponsiveStyle<StyleToken<Property.FontWeight>>;
  height?: ResponsiveStyle<StyleToken<Property.Height>>;
  left?: ResponsiveStyle<StyleToken<Property.Left>>;
  letterSpacing?: ResponsiveStyle<StyleToken<Property.LetterSpacing>>;
  lineHeight?: ResponsiveStyle<StyleToken<Property.LineHeight>>;
  margin?: ResponsiveStyle<StyleToken<Property.Margin>>;
  marginBlockEnd?: ResponsiveStyle<StyleToken<Property.MarginBlockEnd>>;
  marginBlockStart?: ResponsiveStyle<StyleToken<Property.MarginBlockStart>>;
  marginBottom?: ResponsiveStyle<StyleToken<Property.MarginBlockEnd>>;
  marginInlineEnd?: ResponsiveStyle<StyleToken<Property.MarginInlineEnd>>;
  marginInlineStart?: ResponsiveStyle<StyleToken<Property.MarginInlineStart>>;
  marginLeft?: ResponsiveStyle<StyleToken<Property.MarginInlineStart>>;
  marginRight?: ResponsiveStyle<StyleToken<Property.MarginInlineEnd>>;
  marginTop?: ResponsiveStyle<StyleToken<Property.MarginBlockStart>>;
  maxHeight?: ResponsiveStyle<StyleToken<Property.MaxHeight>>;
  maxWidth?: ResponsiveStyle<StyleToken<Property.MaxWidth>>;
  minHeight?: ResponsiveStyle<StyleToken<Property.MinHeight>>;
  minWidth?: ResponsiveStyle<StyleToken<Property.MinWidth>>;
  opacity?: ResponsiveStyle<StyleToken<Property.Opacity>>;
  overflow?: ResponsiveStyle<StyleToken<Property.Overflow>>;
  padding?: ResponsiveStyle<StyleToken<Property.Padding>>;
  paddingBlockEnd?: ResponsiveStyle<StyleToken<Property.MarginBlockEnd>>;
  paddingBlockStart?: ResponsiveStyle<StyleToken<Property.MarginBlockStart>>;
  paddingBottom?: ResponsiveStyle<StyleToken<Property.PaddingBlockEnd>>;
  paddingInlineEnd?: ResponsiveStyle<StyleToken<Property.MarginInlineEnd>>;
  paddingInlineStart?: ResponsiveStyle<StyleToken<Property.MarginInlineStart>>;
  paddingLeft?: ResponsiveStyle<StyleToken<Property.PaddingInlineStart>>;
  paddingRight?: ResponsiveStyle<StyleToken<Property.PaddingInlineEnd>>;
  paddingTop?: ResponsiveStyle<StyleToken<Property.PaddingBlockStart>>;
  position?: ResponsiveStyle<StyleToken<Property.Position>>;
  right?: ResponsiveStyle<StyleToken<Property.Right>>;
  textAlign?: ResponsiveStyle<StyleToken<Property.TextAlign>>;
  textDecoration?: ResponsiveStyle<StyleToken<Property.TextDecoration>>;
  textTransform?: ResponsiveStyle<StyleToken<Property.TextTransform>>;
  top?: ResponsiveStyle<StyleToken<Property.Top>>;
  transform?: ResponsiveStyle<StyleToken<Property.Transform>>;
  transformOrigin?: ResponsiveStyle<StyleToken<Property.TransformOrigin>>;
  width?: ResponsiveStyle<StyleToken<Property.Width>>;
  whiteSpace?: ResponsiveStyle<StyleToken<Property.WhiteSpace>>;
}

export interface CSSLayoutStyleProps {
  /**
   * Controls where the Flex/Grid items sit on the cross axis.
   */
  alignItems?: ResponsiveStyle<Property.AlignItems>;

  /**
   * Sets the distribution of space between and around content items
   */
  alignContent?: ResponsiveStyle<Property.AlignContent>;

  /**
   * Controls where the Flex/Grid items sit on the main axis.
   */
  justifyContent?: ResponsiveStyle<Property.JustifyContent>;

  /**
   * Spacing between child components. Shorthand for rowGap and columnGap.
   */
  gap?: ResponsiveStyle<StyleToken<Property.Gap>>;

  /**
   * Spacing between Flex/Grid child columns
   */
  columnGap?: ResponsiveStyle<StyleToken<Property.GridColumnGap>>;

  /**
   * Spacing between Flex/Grid child rows
   */
  rowGap?: ResponsiveStyle<StyleToken<Property.RowGap>>;
}

export interface AllStyleProps
  extends BaseStyleProps,
    ImageStyleProps,
    FlexContainerStyleProps,
    GridContainerStyleProps,
    TextAreaStyleProps {}

export type ComponentPropToStyleProp = Required<{
  [key in keyof AllStyleProps]: keyof React.CSSProperties;
}>;

/**
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
  marginBlockEnd: 'marginBlockEnd',
  marginBlockStart: 'marginBlockStart',
  marginBottom: 'marginBlockEnd',
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
  paddingBlockEnd: 'paddingBlockEnd',
  paddingBlockStart: 'paddingBlockStart',
  paddingBottom: 'paddingBlockEnd',
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

export const ComponentPropsToStylePropsMapKeys = Object.keys(
  ComponentPropsToStylePropsMap
) as Array<keyof ComponentPropToStyleProp>;
