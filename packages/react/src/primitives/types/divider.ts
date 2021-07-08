import { BaseComponentProps, StyleProps } from "./base";


export interface DividerOptions {
  /**
   * Controls whether the divider is oriented horizontally or vertically.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Size of the divider (height for a horiziontal divider, width for vertical)
   * @default "small"
   */
  size?: "small" | "medium" | "large";
}

export interface DividerProps extends DividerOptions, BaseComponentProps, StyleProps { }
