import { Property } from 'csstype';
import { FlexStyleProps } from './flex';
import { ImageStyleProps } from './image';

type StyleProperty<PropertyType> = PropertyType | PropertyType[];

export interface BaseStyleProps {
  alignSelf?: StyleProperty<Property.AlignSelf>;
  backgroundColor?: StyleProperty<Property.BackgroundColor>;
  border?: StyleProperty<Property.Border>;
  borderRadius?: StyleProperty<Property.BorderRadius>;
  boxShadow?: StyleProperty<Property.BoxShadow>;
  color?: StyleProperty<Property.Color>;
  fontFamily?: StyleProperty<Property.FontFamily>;
  fontSize?: StyleProperty<Property.FontSize>;
  fontStyle?: StyleProperty<Property.FontStyle>;
  fontWeight?: StyleProperty<Property.FontWeight>;
  height?: StyleProperty<Property.Height>;
  letterSpacing?: StyleProperty<Property.LetterSpacing>;
  lineHeight?: StyleProperty<Property.LineHeight>;
  maxHeight?: StyleProperty<Property.MaxHeight>;
  maxWidth?: StyleProperty<Property.MaxWidth>;
  minHeight?: StyleProperty<Property.MinHeight>;
  minWidth?: StyleProperty<Property.MinWidth>;
  opacity?: StyleProperty<Property.Opacity>;
  padding?: StyleProperty<Property.Padding>;
  textDecoration?: StyleProperty<Property.TextDecoration>;
  width?: StyleProperty<Property.Width>;
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
