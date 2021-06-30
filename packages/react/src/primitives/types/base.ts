import React from 'react';
import { Property } from 'csstype';

export enum CustomPropertiesMap {
  backgroundColor = '--background-color',
  color = "--color",
  boxShadow = "--box-shadow",
  padding = "--padding",
  border = "--border",
  borderRadius = "--border-radius",
  height = "--height",
  maxHeight = "--max-height",
  minHeight = "--min-height",
  width = "--width",
  maxWidth = "--max-width",
  minWidth = "--min-width",
  opacity = "--opacity",
}

export interface CustomProperties {
  [CustomPropertiesMap.backgroundColor]?: Property.BackgroundColor;
  [CustomPropertiesMap.color]?: Property.Color;
  [CustomPropertiesMap.boxShadow]?: Property.BoxShadow;
  [CustomPropertiesMap.padding]?: Property.Padding;
  [CustomPropertiesMap.border]?: Property.Border;
  [CustomPropertiesMap.borderRadius]?: Property.BorderRadius;
  [CustomPropertiesMap.height]?: Property.Height;
  [CustomPropertiesMap.maxHeight]?: Property.MaxHeight;
  [CustomPropertiesMap.minHeight]?: Property.MinHeight;
  [CustomPropertiesMap.width]?: Property.Width;
  [CustomPropertiesMap.maxWidth]?: Property.MaxWidth;
  [CustomPropertiesMap.minWidth]?: Property.MinWidth;
  [CustomPropertiesMap.opacity]?: Property.Opacity;
}

/**
 * This is required to support passing our CSS custom properties
 * to React's `style` prop
 */
declare module 'csstype' {
  interface Properties extends CustomProperties { }
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
}
