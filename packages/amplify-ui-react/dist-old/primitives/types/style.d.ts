/// <reference types="react" />
import { Property } from 'csstype';
import { FlexStyleProps } from './flex';
import { ImageStyleProps } from './image';
export interface BaseStyleProps {
  alignSelf?: Property.AlignSelf;
  backgroundColor?: Property.BackgroundColor;
  border?: Property.Border;
  borderRadius?: Property.BorderRadius;
  boxShadow?: Property.BoxShadow;
  color?: Property.Color;
  fontFamily?: Property.FontFamily;
  fontSize?: Property.FontSize;
  fontStyle?: Property.FontStyle;
  fontWeight?: Property.FontWeight;
  height?: Property.Height;
  letterSpacing?: Property.LetterSpacing;
  lineHeight?: Property.LineHeight;
  maxHeight?: Property.MaxHeight;
  maxWidth?: Property.MaxWidth;
  minHeight?: Property.MinHeight;
  minWidth?: Property.MinWidth;
  opacity?: Property.Opacity;
  padding?: Property.Padding;
  textDecoration?: Property.TextDecoration;
  width?: Property.Width;
}
export interface AllStyleProps
  extends BaseStyleProps,
    ImageStyleProps,
    FlexStyleProps {}
export declare type ComponentPropToStyleProp = {
  [key in keyof AllStyleProps]: keyof React.CSSProperties;
};
/**
 * Maps from component style props to React `style` props
 * Note: Primarily needed to map from component style props that don't match CSS Properties directly
 * such as wrap => flexWrap and direction => flexDirection
 */
export declare const ComponentPropsToStylePropsMap: ComponentPropToStyleProp;
