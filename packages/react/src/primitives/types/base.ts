import React from "react";
import { Property } from "csstype";

export enum CustomPropertiesMap {
  backgroundColor = "--background-color",
  border = "--border",
  borderRadius = "--border-radius",
  boxShadow = "--box-shadow",
  color = "--color",
  fontFamily = "--font-family",
  fontStyle = "--font-style",
  fontWeight = "--font-weight",
  height = "--height",
  letterSpacing = "--letter-spacing",
  lineHeight = "--line-height",
  maxHeight = "--max-height",
  maxWidth = "--max-width",
  minHeight = "--min-height",
  minWidth = "--min-width",
  opacity = "--opacity",
  padding = "--padding",
  textDecoration = "--text-decoration",
  width = "--width",
}

export interface CustomProperties {
  [CustomPropertiesMap.backgroundColor]?: Property.BackgroundColor;
  [CustomPropertiesMap.border]?: Property.Border;
  [CustomPropertiesMap.borderRadius]?: Property.BorderRadius;
  [CustomPropertiesMap.boxShadow]?: Property.BoxShadow;
  [CustomPropertiesMap.color]?: Property.Color;
  [CustomPropertiesMap.fontFamily]?: Property.FontFamily;
  [CustomPropertiesMap.fontStyle]?: Property.FontStyle;
  [CustomPropertiesMap.fontWeight]?: Property.FontWeight;
  [CustomPropertiesMap.height]?: Property.Height;
  [CustomPropertiesMap.letterSpacing]?: Property.LetterSpacing;
  [CustomPropertiesMap.lineHeight]?: Property.LineHeight;
  [CustomPropertiesMap.maxHeight]?: Property.MaxHeight;
  [CustomPropertiesMap.maxWidth]?: Property.MaxWidth;
  [CustomPropertiesMap.minHeight]?: Property.MinHeight;
  [CustomPropertiesMap.minWidth]?: Property.MinWidth;
  [CustomPropertiesMap.opacity]?: Property.Opacity;
  [CustomPropertiesMap.padding]?: Property.Padding;
  [CustomPropertiesMap.textDecoration]?: Property.TextDecoration;
  [CustomPropertiesMap.width]?: Property.Width;
}

/**
 * This is required to support passing our CSS custom properties
 * to React's `style` prop
 */
declare module "csstype" {
  interface Properties extends CustomProperties {}
}

// Base component definition
export interface BaseComponentProps {
  id?: string;
  className?: string;
}

export interface AriaProps {
  ariaLabel?: string;
}

export interface StyleProps {
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
