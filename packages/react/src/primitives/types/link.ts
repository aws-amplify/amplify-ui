import * as React from 'react';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';

export interface LinkOptions {
  /**
   * @description
   * Boolean value indicating an external link
   * sets the rel attribute to "noopener noreferrer"
   */
  isExternal?: boolean;

  /**
   * @description
   * string litteral value indicating the position of the icon
   * position the icon to the left or to the right of the link text
   */
  linkIconPosition?: 'left' | 'right';

  /**
   * @description
   * Boolean value indicating to hide the icon
   * hide the icon from the link if true
   */
  hideIcon?: boolean;

  /**
   * @description
   * a stringifier that returns a string containing the whole URL, and allows the href to be updated.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/href)
   */
  href?: string;
}

/** @deprecated For internal use only */
export interface BaseLinkProps extends BaseViewProps, LinkOptions {
  /**
   * @description
   * Children to be rendered inside the Link component
   */
  children: React.ReactNode;
}

export type LinkProps<Element extends ElementType = 'a'> = PrimitiveProps<
  BaseLinkProps,
  Element
>;
