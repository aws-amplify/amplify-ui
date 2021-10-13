import { Property } from 'csstype';

import { FlexItemStyleProps, FlexContainerStyleProps } from './flex';
import { GridItemStyleProps, GridContainerStyleProps } from './grid';
import { ImageStyleProps } from './image';

export interface ResponsiveObject<PropertyType> {
  base?: PropertyType;
  small?: PropertyType;
  medium?: PropertyType;
  large?: PropertyType;
  xl?: PropertyType;
  xxl?: PropertyType;
}

export type ResponsiveStyle<PropertyType> =
  | PropertyType
  | PropertyType[]
  | ResponsiveObject<PropertyType>;

export interface BaseStyleProps extends FlexItemStyleProps, GridItemStyleProps {
  alignSelf?: ResponsiveStyle<Property.AlignSelf>;
  backgroundColor?: ResponsiveStyle<Property.BackgroundColor>;
  border?: ResponsiveStyle<Property.Border>;
  borderRadius?: ResponsiveStyle<Property.BorderRadius>;
  boxShadow?: ResponsiveStyle<Property.BoxShadow>;
  color?: ResponsiveStyle<Property.Color>;
  fontFamily?: ResponsiveStyle<Property.FontFamily>;
  fontSize?: ResponsiveStyle<Property.FontSize>;
  fontStyle?: ResponsiveStyle<Property.FontStyle>;
  fontWeight?: ResponsiveStyle<Property.FontWeight>;
  height?: ResponsiveStyle<Property.Height>;
  letterSpacing?: ResponsiveStyle<Property.LetterSpacing>;
  lineHeight?: ResponsiveStyle<Property.LineHeight>;
  maxHeight?: ResponsiveStyle<Property.MaxHeight>;
  maxWidth?: ResponsiveStyle<Property.MaxWidth>;
  minHeight?: ResponsiveStyle<Property.MinHeight>;
  minWidth?: ResponsiveStyle<Property.MinWidth>;
  opacity?: ResponsiveStyle<Property.Opacity>;
  padding?: ResponsiveStyle<Property.Padding>;
  textAlign?: ResponsiveStyle<Property.TextAlign>;
  textDecoration?: ResponsiveStyle<Property.TextDecoration>;
  width?: ResponsiveStyle<Property.Width>;
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
  gap?: ResponsiveStyle<Property.Gap>;

  /**
   * Spacing between Flex/Grid child columns
   */
  columnGap?: ResponsiveStyle<Property.GridColumnGap>;

  /**
   * Spacing between Flex/Grid child rows
   */
  rowGap?: ResponsiveStyle<Property.RowGap>;
}

export interface AllStyleProps
  extends BaseStyleProps,
    ImageStyleProps,
    FlexContainerStyleProps,
    GridContainerStyleProps {}

export type ComponentPropToStyleProp = {
  [key in keyof AllStyleProps]: keyof React.CSSProperties;
};

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
  basis: 'flexBasis',
  border: 'border',
  borderRadius: 'borderRadius',
  boxShadow: 'boxShadow',
  color: 'color',
  column: 'gridColumn',
  columnEnd: 'gridColumnEnd',
  columnGap: 'columnGap',
  columnSpan: 'gridColumn', // Will set gridColumn if no `row` prop given
  columnStart: 'gridColumnStart',
  direction: 'flexDirection',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontStyle: 'fontStyle',
  fontWeight: 'fontWeight',
  gap: 'gap',
  grow: 'flexGrow',
  height: 'height',
  justifyContent: 'justifyContent',
  letterSpacing: 'letterSpacing',
  lineHeight: 'lineHeight',
  maxHeight: 'maxHeight',
  maxWidth: 'maxWidth',
  minHeight: 'minHeight',
  minWidth: 'minWidth',
  objectFit: 'objectFit',
  objectPosition: 'objectPosition',
  opacity: 'opacity',
  order: 'order',
  padding: 'padding',
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
  width: 'width',
  wrap: 'flexWrap',
};

export const ComponentPropsToStylePropsMapKeys = Object.keys(
  ComponentPropsToStylePropsMap
) as Array<keyof ComponentPropToStyleProp>;
