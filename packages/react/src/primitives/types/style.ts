import { Property } from 'csstype';
import React from 'react';
import { FlexStyleProps } from './flex';
import { ImageStyleProps } from './image';

export interface BaseStyleProps {
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
