import { Property } from "csstype";
import { FlexStyleProps } from "./flex";
import { ImageStyleProps } from "./image";

export interface BaseStyleProps {
  backgroundColor?: Property.BackgroundColor;
  color?: Property.Color;

  boxShadow?: Property.BoxShadow;

  padding?: Property.Padding;

  border?: Property.Border;
  borderRadius?: Property.BorderRadius;

  height?: Property.Height;
  maxHeight?: Property.MaxHeight;
  minHeight?: Property.MinHeight;

  width?: Property.Width;
  maxWidth?: Property.MaxWidth;
  minWidth?: Property.MinWidth;

  opacity?: Property.Opacity;

  fontFamily?: Property.FontFamily;
  fontStyle?: Property.FontStyle;
  fontWeight?: Property.FontWeight;
  letterSpacing?: Property.LetterSpacing;
  lineHeight?: Property.LineHeight;
  textDecoration?: Property.TextDecoration;
}

export interface AllStyleProps extends BaseStyleProps, ImageStyleProps, FlexStyleProps { }

export type ComponentPropToStyleProp = {
  [key in keyof AllStyleProps]: keyof React.CSSProperties
}

/**
 * Maps from component style props to React `style` props
 * Note: Primarily needed to map from component style props that don't match CSS Properties directly
 * such as wrap => flexWrap and direction => flexDirection
 */
export const ComponentPropsToStylePropsMap: ComponentPropToStyleProp = {
  alignContent: "alignContent",
  alignItems: "alignItems",
  backgroundColor: "backgroundColor",
  border: "border",
  borderRadius: "borderRadius",
  boxShadow: "boxShadow",
  color: "color",
  direction: "flexDirection",
  fontFamily: "fontFamily",
  fontStyle: "fontStyle",
  fontWeight: "fontWeight",
  gap: "gap",
  height: "height",
  justifyContent: "justifyContent",
  letterSpacing: "letterSpacing",
  lineHeight: "lineHeight",
  maxHeight: "maxHeight",
  maxWidth: "maxWidth",
  minHeight: "minHeight",
  minWidth: "minWidth",
  objectFit: "objectFit",
  objectPosition: 'objectPosition',
  opacity: "opacity",
  padding: "padding",
  textDecoration: "textDecoration",
  width: "width",
  wrap: "flexWrap",
}
