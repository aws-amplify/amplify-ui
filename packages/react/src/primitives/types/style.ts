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
export type StyleToken<PropertyType> =
  | PropertyType
  | WebDesignToken<PropertyType>;

export type ResponsiveStyle<PropertyType> =
  | StyleProp<PropertyType>
  | StyleProp<PropertyType>[]
  | ResponsiveObject<StyleProp<PropertyType>>;

export interface BaseStyleProps extends FlexItemStyleProps, GridItemStyleProps {
  alignSelf?: ResponsiveStyle<StyleToken<Property.AlignSelf>>;
  backgroundColor?: ResponsiveStyle<
    ColorKeys<StyleToken<Property.BackgroundColor>>
  >;
  backgroundImage?: ResponsiveStyle<StyleToken<Property.BackgroundImage>>;
  border?: ResponsiveStyle<StyleToken<Property.Border>>;
  borderRadius?: ResponsiveStyle<RadiiKeys<StyleToken<Property.BorderRadius>>>;
  bottom?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Bottom>>>;
  boxShadow?: ResponsiveStyle<BoxShadowKeys<StyleToken<Property.BoxShadow>>>;
  color?: ResponsiveStyle<ColorKeys<StyleToken<Property.Color>>>;
  display?: ResponsiveStyle<StyleToken<Property.Display>>;
  fontFamily?: ResponsiveStyle<FontFamilyKeys<StyleToken<Property.FontFamily>>>;
  fontSize?: ResponsiveStyle<FontSizeKeys<StyleToken<Property.FontSize>>>;
  fontStyle?: ResponsiveStyle<StyleToken<Property.FontStyle>>;
  fontWeight?: ResponsiveStyle<FontWeightKeys<StyleToken<Property.FontWeight>>>;
  height?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Height>>>;
  left?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Left>>>;
  letterSpacing?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.LetterSpacing>>
  >;
  lineHeight?: ResponsiveStyle<LineHeightKeys<StyleToken<Property.LineHeight>>>;
  margin?: ResponsiveStyle<StyleToken<Property.Margin>>;
  marginBlockEnd?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.MarginBlockEnd>>
  >;
  marginBlockStart?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.MarginBlockStart>>
  >;
  marginBottom?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginBottom>>>;
  marginInlineEnd?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.MarginInlineEnd>>
  >;
  marginInlineStart?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.MarginInlineStart>>
  >;
  marginLeft?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginLeft>>>;
  marginRight?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginRight>>>;
  marginTop?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MarginTop>>>;
  maxHeight?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MaxHeight>>>;
  maxWidth?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MaxWidth>>>;
  minHeight?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MinHeight>>>;
  minWidth?: ResponsiveStyle<SpaceKeys<StyleToken<Property.MinWidth>>>;
  opacity?: ResponsiveStyle<OpacityKeys<StyleToken<Property.Opacity>>>;
  overflow?: ResponsiveStyle<StyleToken<Property.Overflow>>;
  padding?: ResponsiveStyle<StyleToken<Property.Padding>>;
  paddingBlockEnd?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.PaddingBlockEnd>>
  >;
  paddingBlockStart?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.PaddingBlockStart>>
  >;
  paddingBottom?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.PaddingBottom>>
  >;
  paddingInlineEnd?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.PaddingInlineEnd>>
  >;
  paddingInlineStart?: ResponsiveStyle<
    SpaceKeys<StyleToken<Property.PaddingInlineStart>>
  >;
  paddingLeft?: ResponsiveStyle<SpaceKeys<StyleToken<Property.PaddingLeft>>>;
  paddingRight?: ResponsiveStyle<SpaceKeys<StyleToken<Property.PaddingRight>>>;
  paddingTop?: ResponsiveStyle<SpaceKeys<StyleToken<Property.PaddingTop>>>;
  position?: ResponsiveStyle<StyleToken<Property.Position>>;
  right?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Right>>>;
  textAlign?: ResponsiveStyle<StyleToken<Property.TextAlign>>;
  textDecoration?: ResponsiveStyle<StyleToken<Property.TextDecoration>>;
  textTransform?: ResponsiveStyle<StyleToken<Property.TextTransform>>;
  top?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Top>>>;
  transform?: ResponsiveStyle<TransformKeys<StyleToken<Property.Transform>>>;
  transformOrigin?: ResponsiveStyle<StyleToken<Property.TransformOrigin>>;
  width?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Width>>>;
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
  gap?: ResponsiveStyle<SpaceKeys<StyleToken<Property.Gap>>>;

  /**
   * Spacing between Flex/Grid child columns
   */
  columnGap?: ResponsiveStyle<SpaceKeys<StyleToken<Property.GridColumnGap>>>;

  /**
   * Spacing between Flex/Grid child rows
   */
  rowGap?: ResponsiveStyle<SpaceKeys<StyleToken<Property.RowGap>>>;
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
