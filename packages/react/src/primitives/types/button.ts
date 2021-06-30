import { AriaProps, BaseComponentProps } from "./base";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonTypes = "button" | "reset" | "submit";
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "link";

export interface ButtonProps extends BaseComponentProps, AriaProps {
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean;

  /**
   * If `true`, the button will take up the full width of its container.
   */
  isFullWidth?: boolean;

  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean;

  /**
   * The label to show in the button when `loading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string;

  /**
   * Button click event handler
   */
  onClick?: (event: React.MouseEvent) => void;

  /**
   * Changes the size of the button.
   * @default "medium"
   */
  size?: ButtonSize;

  /**
   * Changes the button type
   * @default "button"
   */
  type?: ButtonTypes;

  /**
   * Changes the visual weight of the button.
   * @default "secondary"
   */
  variant?: ButtonVariant;

}

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
	direction?: "row" | "column" | "column-reverse" | "row-reverse";
	
	/**
	 * Spacing between child components
	 */
	gap?: string; // should we be more specific about the type of dimension we're expecting?
	
	/**
	 * controls where the flex items sit on the main axis.
	 */
	justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
	
	/**
	 * controls where the flex items sit on the cross axis.
	 */
	alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
	
	/**
	 * sets the distribution of space between and around content items
	 */
	alignContent?: "flex-start" | "flex-end" | "stretch" | "center" | "space-between" | "space-around";
	
	/**
	 * The flexWrap property is set on containers and it controls what happens when 
	 * children overflow the size of the container along the main axis. By default, 
	 * children are forced into a single line (which can shrink elements). If 
	 * wrapping is allowed, items are wrapped into multiple lines along the main 
	 * axis if needed.
	 * (maps to flex-wrap CSS property)
	 */
	wrap?: "nowrap" | "wrap" | "wrap-reverse"; // perhaps just use the FlexWrap type from CSS properties?
	
	/**
	 * Any arbitrary props will be passed to the underlying element. A user could pass
	 * an onClick method if they wanted to or data-* attributes if needed.
	 */
	[key: string]: any;
}
