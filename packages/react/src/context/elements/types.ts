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
  T extends ElementsBase[keyof ElementsBase],
  K = {},
> = (props: React.ComponentProps<T> & K) => JSX.Element;

export interface BaseElementProps<T> {
  children?: React.ReactNode;
  className?: string;
  ref?: React.Ref<T>;
}

export interface ViewElementProps extends BaseElementProps<HTMLDivElement> {}

export interface ButtonElementProps
  extends BaseElementProps<HTMLButtonElement> {
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
}

export interface ButtonGroupElementProps
  extends BaseElementProps<HTMLDivElement> {
  isDisabled?: boolean;
}

export interface MenuItemElement extends BaseElementProps<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  value?: string;
}

export interface MenuElementProps extends BaseElementProps<HTMLMenuElement> {
  isDisabled?: boolean;
}

export interface AnchorElementProps
  extends BaseElementProps<HTMLAnchorElement> {
  href?: string;
  isCurrent?: boolean;
  label?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  value?: string;
}

export interface NavElementProps extends BaseElementProps<HTMLElement> {}

export interface TextElementProps
  extends BaseElementProps<HTMLParagraphElement> {}

/**
 * UI Primitives (Elements) are the base building blocks of Subcomponents.
 *
 * Elements interfaces include a minimal set of (mostly) HTML semantic `props`
 * required to achieve expected functionality of the Element. `props` are always
 * optional at the interface level.
 *
 * `props` could include (but not limited to):
 *
 * - a11y attributes
 * - event handlers
 * - `children`
 */
export interface ElementsBase extends Elements {
  Anchor: Component<AnchorElementProps>;
  Button: Component<ButtonElementProps>;
  ButtonGroup: Component<ButtonGroupElementProps>;
  Menu: Component<MenuElementProps>;
  Nav: Component<NavElementProps>;
  Text: Component<TextElementProps>;
  View: Component<ViewElementProps>;
}
