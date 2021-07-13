import { BaseComponentProps, StyleProps } from "./base";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerSize = "small" | "medium" | "large";

export interface DividerOptions {
  /**
   * Controls whether the divider is oriented horizontally or vertically.
   * @default "horizontal"
   */
  orientation?: DividerOrientation;

  /**
   * Size of the divider (height for a horiziontal divider, width for vertical)
   * @default "small"
   */
  size?: DividerSize;
}

export interface DividerProps extends DividerOptions, BaseComponentProps, StyleProps { }
