import { BaseComponentProps } from "./base";

export interface CardProps extends BaseComponentProps {
  linkTo?: string;

  selectable?: boolean;
  selected?: boolean;
  onClick?: (e: Event) => null;
}
