import { ButtonProps } from './button';

export interface MenuProps extends ButtonProps {
  button: React.ReactNode;

  /**
   * Default for uncontrolled menu
   *
   */
  defaultOpen?: boolean;

  /**
   * Default for controlled menu
   */
  isOpen?: boolean;

  /**
   * Handle open and close event of menu
   */
  onOpenChange?: (open: boolean) => {};

  /**
   * Menu primitive only accepts MenuItem components as children.
   */
  children: React.ReactElement | React.ReactElement[];
}

export interface MenuItemProps extends ButtonProps {}
