import React from "react";

import { Property } from "csstype";

export enum CssPropertiesMap {
  alignContent = "align-content",
  alignItems = "align-items",
  backgroundColor = "background-color",
  border = "border",
  borderRadius = "border-radius",
  boxShadow = "box-shadow",
  color = "color",
  direction = "flex-direction",
  fontFamily = "font-family",
  fontStyle = "font-style",
  fontWeight = "font-weight",
  gap = "gap",
  height = "height",
  justifyContent = "justify-content",
  letterSpacing = "letter-spacing",
  lineHeight = "line-height",
  maxHeight = "max-height",
  maxWidth = "max-width",
  minHeight = "min-height",
  minWidth = "min-width",
  opacity = "opacity",
  padding = "padding",
  textDecoration = "text-decoration",
  width = "width",
  wrap = "flex-wrap",
}

// Base component definition
export interface BaseComponentProps {
  id?: string;
  className?: string;

  /**
   * Any arbitrary props will be passed to the underlying element.
   */
  [key: string]: any;
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

export interface ImageStyleProps {
  objectFit?: Property.ObjectFit;
  objectPosition?: Property.ObjectPosition;
}
