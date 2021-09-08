import { Property } from 'csstype';
import { FlexStyleProps } from './flex';
import { ImageStyleProps } from './image';

interface ResponsiveObject<PropertyType> {
  base?: PropertyType;
  small?: PropertyType;
  medium?: PropertyType;
}

type ResponsiveStyle<PropertyType> =
  | PropertyType
  | PropertyType[]
  | ResponsiveObject<PropertyType>;

export interface BaseStyleProps {
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
  textDecoration?: ResponsiveStyle<Property.TextDecoration>;
  width?: ResponsiveStyle<Property.Width>;
}

export interface AllStyleProps
  extends BaseStyleProps,
    ImageStyleProps,
    FlexStyleProps {}

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
  backgroundColor: 'backgroundColor',
  border: 'border',
  borderRadius: 'borderRadius',
  boxShadow: 'boxShadow',
  color: 'color',
  direction: 'flexDirection',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontStyle: 'fontStyle',
  fontWeight: 'fontWeight',
  gap: 'gap',
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
  padding: 'padding',
  textDecoration: 'textDecoration',
  width: 'width',
  wrap: 'flexWrap',
};
