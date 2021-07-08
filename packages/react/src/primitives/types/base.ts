import { Property } from "csstype";

export enum CustomPropertiesMap {
  backgroundColor = "--background-color",
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
  direction = "--flex-direction",
  gap = "--gap",
  justifyContent = "--justify-content",
  alignItems = "--align-items",
  alignContent = "--align-content",
  wrap = "--flex-wrap",
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
  [CustomPropertiesMap.direction]?: Property.FlexDirection;
  [CustomPropertiesMap.gap]?: Property.Gap;
  [CustomPropertiesMap.justifyContent]?: Property.JustifyContent;
  [CustomPropertiesMap.alignItems]?: Property.AlignItems;
  [CustomPropertiesMap.alignContent]?: Property.AlignContent;
  [CustomPropertiesMap.wrap]?: Property.FlexWrap;
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
  /**
   * Any arbitrary props will be passed to the underlying element. A user could pass
   * an onClick method if they wanted to or data-* attributes if needed.
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
}

export interface LayoutStyleProps {
  direction?: Property.FlexDirection;
  gap?: Property.Gap;
  justifyContent?: Property.JustifyContent;
  alignItems?: Property.AlignItems;
  alignContent?: Property.AlignContent;
  wrap?: Property.FlexWrap;
}
