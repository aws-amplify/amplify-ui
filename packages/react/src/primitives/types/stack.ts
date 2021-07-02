import { BaseComponentProps } from "./base";

export type StackDirection =
  | "row"
  | "column"
  | "column-reverse"
  | "row-reverse";
export type StackJustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
export type StackAlignItems =
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline";
export type StackAlignContent =
  | "flex-start"
  | "flex-end"
  | "stretch"
  | "center"
  | "space-between"
  | "space-around";
export type StackWrap = "nowrap" | "wrap" | "wrap-reverse";

export interface StackProps extends BaseComponentProps {
  /**
   * All React components should accept a className parameter that can be used for
   * custom styling via CSS.
   */
  className?: string;

  /**
   * sets how flex items are placed in the flex container defining the main axis
   * and the direction (normal or reversed). (maps to flex-direction CSS property)
   */
  direction?: StackDirection;

  /**
   * Spacing between child components
   */
  gap?: string;

  /**
   * controls where the flex items sit on the main axis.
   */
  justifyContent?: StackJustifyContent;

  /**
   * controls where the flex items sit on the cross axis.
   */
  alignItems?: StackAlignItems;

  /**
   * sets the distribution of space between and around content items
   */
  alignContent?: StackAlignContent;

  /**
   * The flexWrap property is set on containers and it controls what happens when
   * children overflow the size of the container along the main axis. By default,
   * children are forced into a single line (which can shrink elements). If
   * wrapping is allowed, items are wrapped into multiple lines along the main
   * axis if needed.
   * (maps to flex-wrap CSS property)
   */
  wrap?: StackWrap;

  /**
   * Any arbitrary props will be passed to the underlying element. A user could pass
   * an onClick method if they wanted to or data-* attributes if needed.
   */
  [key: string]: any;
}
