import { Property } from 'csstype';
import { WebDesignToken } from '@aws-amplify/ui';

import { FlexItemStyleProps, FlexContainerStyleProps } from './flex';
import { GridItemStyleProps, GridContainerStyleProps } from './grid';
import { ImageStyleProps } from './image';
import { TextAreaStyleProps } from './textArea';

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
  alignSelf?: ResponsiveStyle<Property.AlignSelf | WebDesignToken>;
  backgroundColor?: ResponsiveStyle<Property.BackgroundColor | WebDesignToken>;
  border?: ResponsiveStyle<Property.Border | WebDesignToken>;
  borderRadius?: ResponsiveStyle<Property.BorderRadius | WebDesignToken>;
  bottom?: ResponsiveStyle<Property.Bottom | WebDesignToken>;
  boxShadow?: ResponsiveStyle<Property.BoxShadow | WebDesignToken>;
  color?: ResponsiveStyle<Property.Color | WebDesignToken>;
  display?: ResponsiveStyle<Property.Display | WebDesignToken>;
  fontFamily?: ResponsiveStyle<Property.FontFamily | WebDesignToken>;
  fontSize?: ResponsiveStyle<Property.FontSize | WebDesignToken>;
  fontStyle?: ResponsiveStyle<Property.FontStyle | WebDesignToken>;
  fontWeight?: ResponsiveStyle<Property.FontWeight | WebDesignToken>;
  height?: ResponsiveStyle<Property.Height | WebDesignToken>;
  left?: ResponsiveStyle<Property.Left | WebDesignToken>;
  letterSpacing?: ResponsiveStyle<Property.LetterSpacing | WebDesignToken>;
  lineHeight?: ResponsiveStyle<Property.LineHeight | WebDesignToken>;
  maxHeight?: ResponsiveStyle<Property.MaxHeight | WebDesignToken>;
  maxWidth?: ResponsiveStyle<Property.MaxWidth | WebDesignToken>;
  minHeight?: ResponsiveStyle<Property.MinHeight | WebDesignToken>;
  minWidth?: ResponsiveStyle<Property.MinWidth | WebDesignToken>;
  opacity?: ResponsiveStyle<Property.Opacity | WebDesignToken>;
  overflow?: ResponsiveStyle<Property.Overflow | WebDesignToken>;
  padding?: ResponsiveStyle<Property.Padding | WebDesignToken>;
  position?: ResponsiveStyle<Property.Position | WebDesignToken>;
  right?: ResponsiveStyle<Property.Right | WebDesignToken>;
  textAlign?: ResponsiveStyle<Property.TextAlign | WebDesignToken>;
  textDecoration?: ResponsiveStyle<Property.TextDecoration | WebDesignToken>;
  textTransform?: ResponsiveStyle<Property.TextTransform | WebDesignToken>;
  top?: ResponsiveStyle<Property.Top | WebDesignToken>;
  transform?: ResponsiveStyle<Property.Transform | WebDesignToken>;
  transformOrigin?: ResponsiveStyle<Property.TransformOrigin | WebDesignToken>;
  width?: ResponsiveStyle<Property.Width | WebDesignToken>;
}

export interface CSSLayoutStyleProps {
  /**
   * Controls where the Flex/Grid items sit on the cross axis.
   */
  alignItems?: ResponsiveStyle<Property.AlignItems | WebDesignToken>;

  /**
   * Sets the distribution of space between and around content items
   */
  alignContent?: ResponsiveStyle<Property.AlignContent | WebDesignToken>;

  /**
   * Controls where the Flex/Grid items sit on the main axis.
   */
  justifyContent?: ResponsiveStyle<Property.JustifyContent | WebDesignToken>;

  /**
   * Spacing between child components. Shorthand for rowGap and columnGap.
   */
  gap?: ResponsiveStyle<Property.Gap | WebDesignToken>;

  /**
   * Spacing between Flex/Grid child columns
   */
  columnGap?: ResponsiveStyle<Property.GridColumnGap | WebDesignToken>;

  /**
   * Spacing between Flex/Grid child rows
   */
  rowGap?: ResponsiveStyle<Property.RowGap | WebDesignToken>;
}

export interface AllStyleProps
  extends BaseStyleProps,
    ImageStyleProps,
    FlexContainerStyleProps,
    GridContainerStyleProps,
    TextAreaStyleProps {}

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
  wrap: 'flexWrap',
};

export const ComponentPropsToStylePropsMapKeys = Object.keys(
  ComponentPropsToStylePropsMap
) as Array<keyof ComponentPropToStyleProp>;
