import React from 'react';

type RecordOf<T, K> = T extends string ? Record<T, K> : Record<keyof T, K>;

type Component<T = {}> = React.ComponentType<T>;

export type Elements<
  T extends RecordOf<keyof T, Component> = RecordOf<string, Component>,
> = T;

export interface ElementsProviderProps<T extends Elements> {
  children?: React.ReactNode;
  elements: T;
}

/**
 * Utility type for adding additional props to a Element definition
 */
export type ExtendElement<
  T extends DefaultElements[keyof DefaultElements],
  K = {},
> = (props: React.ComponentProps<T> & K) => JSX.Element;

export interface BaseElementProps<T> {
  children?: React.ReactNode;
  className?: string;
  ref?: React.Ref<T>;
}

export interface ViewProps extends BaseElementProps<HTMLDivElement> {}

export interface ButtonProps extends BaseElementProps<HTMLButtonElement> {
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
}

export interface ButtonGroupProps extends BaseElementProps<HTMLDivElement> {
  isDisabled?: boolean;
}

export interface MenuItem extends BaseElementProps<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  value?: string;
}

export interface MenuProps extends BaseElementProps<HTMLMenuElement> {
  isDisabled?: boolean;
  items?: MenuItem[];
  onValueChange?: (value: string) => void;
  renderItem?: (props: MenuItem) => JSX.Element;
}

export interface AnchorProps extends BaseElementProps<HTMLAnchorElement> {
  href?: string;
  isCurrent?: boolean;
  label?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  value?: string;
}

export interface NavProps extends BaseElementProps<HTMLElement> {
  items?: AnchorProps[];
  onValueChange?: (value: string) => void;
  renderItem?: (item: AnchorProps) => JSX.Element;
}

export interface TextProps extends BaseElementProps<HTMLParagraphElement> {}

/**
 * UI Elements are the base building blocks of Subcomponents.
 *
 * Element interfaces include a minimal set of (mostly) HTML semantic `props`
 * required to achieve expected functionality of the Element. `props` are always
 * optional at the interface level.
 *
 * `props` could include (but not limited to):
 *
 * - a11y attributes
 * - event handlers
 * - `children`
 */
export interface DefaultElements extends Elements {
  Anchor: Component<AnchorProps>;
  Button: Component<ButtonProps>;
  ButtonGroup: Component<ButtonGroupProps>;
  Menu: Component<MenuProps>;
  Nav: Component<NavProps>;
  Text: Component<TextProps>;
  View: Component<ViewProps>;
}
