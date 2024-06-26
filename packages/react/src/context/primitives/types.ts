import React from 'react';

type RecordOf<T, K> = T extends string ? Record<T, K> : Record<keyof T, K>;

type Component<T = {}> = React.ComponentType<T>;

export type Primitives<
  T extends RecordOf<keyof T, Component> = RecordOf<string, Component>
> = T;

export interface PrimitivesProviderProps<T extends Primitives> {
  children?: React.ReactNode;
  primitives: T;
}

/**
 * Utility type for adding additional props to a Primitive definition
 */
export type ExtendPrimitive<
  T extends DefaultPrimitives[keyof DefaultPrimitives],
  K = {}
> = (props: React.ComponentProps<T> & K) => JSX.Element;

export interface BasePrimitiveProps<T> {
  children?: React.ReactNode;
  className?: string;
  ref?: React.Ref<T>;
}

export interface ViewProps extends BasePrimitiveProps<HTMLDivElement> {}

export interface ButtonProps extends BasePrimitiveProps<HTMLButtonElement> {
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
}

export interface ButtonGroupProps extends BasePrimitiveProps<HTMLDivElement> {
  isDisabled?: boolean;
}

export interface MenuItem extends BasePrimitiveProps<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  value?: string;
}

export interface MenuProps extends BasePrimitiveProps<HTMLMenuElement> {
  isDisabled?: boolean;
  items?: MenuItem[];
  onValueChange?: (value: string) => void;
  renderItem?: (props: MenuItem) => JSX.Element;
}

export interface AnchorProps extends BasePrimitiveProps<HTMLAnchorElement> {
  href?: string;
  isCurrent?: boolean;
  label?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  value?: string;
}

export interface NavProps extends BasePrimitiveProps<HTMLElement> {
  items?: AnchorProps[];
  onValueChange?: (value: string) => void;
  renderItem?: (item: AnchorProps) => JSX.Element;
}

export interface TextProps extends BasePrimitiveProps<HTMLParagraphElement> {}

/**
 * UI Primitives are the base building blocks of Subcomponents.
 *
 * Primitive interfaces include a minimal set of (mostly) HTML semantic `props`
 * required to achieve expected functionality of the Primitive. `props` are always
 * optional at the interface level.
 *
 * `props` could include (but not limited to):
 *
 * - a11y attributes
 * - event handlers
 * - `children`
 */
export interface DefaultPrimitives extends Primitives {
  Anchor: Component<AnchorProps>;
  Button: Component<ButtonProps>;
  ButtonGroup: Component<ButtonGroupProps>;
  Menu: Component<MenuProps>;
  Nav: Component<NavProps>;
  Text: Component<TextProps>;
  View: Component<ViewProps>;
}
