import { BaseComponentProps } from "./base";

import { BaseStyleProps } from "./style";

export type BadgeVariant = "default" | "info" | "error" | "warning" | "success";
export type BadgeSize = "small" | "medium" | "large";

export interface BadgeProps extends BaseComponentProps, BaseStyleProps {
  variant?: BadgeVariant;
  /**
   * The size property will affect both the padding and font size of the badge.
   * Note: this component *should not* inherit its font size from its parent.
   * It should define its own font size. The reason is you could have a badge inside
   * an <h2> and the text of the badge should not have the same size.
   */
  size?: BadgeSize;
}
