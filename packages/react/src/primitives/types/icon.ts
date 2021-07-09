import { ViewProps } from "./view";
import { Property } from "csstype";

export interface ViewBox {
  minX?: number;
  minY?: number;
  width?: number;
  height?: number;
}

export type IconSize = "small" | "medium" | "large";

export interface IconProps extends ViewProps {
  /**
   * Custom icons can be built by providing a path's data (the 'd' attribute in SVG)
   * This will allow customers to create their own icons in code or potentially
   * from a Figma export.
   */
  pathData?: string;

  viewBox?: ViewBox;

  /**
   * By default this will be `currentColor` to match what is generally expected
   * of icons (they inherit their color from current font color).
   */
  fill?: Property.Color;

  /**
   *
   * Note: icons will inherit their size based on current font size. This will
   * be used to set a size directly.
   */
  size?: IconSize;
}
