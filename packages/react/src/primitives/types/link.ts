import React from 'react';
import { BaseComponentProps, AriaProps } from './base';
import { BaseStyleProps } from './style';

type LinkSize = 'small' | 'large';
export interface LinkOptions {
  /**
   * Boolean value indicating an external link
   * sets the rel attribute to "noopener noreferrer"
   */
  isExternal?: boolean;

  /**
   *
   * This will set the font size of the link text
   * Default css value is medium
   */
  size?: LinkSize;

  /**
   * React component to use instead of an anchor tag
   * This is used for react routing libraries that have routing components
   */
  as?: React.ComponentType;

  /**
   * Children to be rendered inside the Link component
   */
  children: React.ReactNode;
}

export interface LinkProps
  extends BaseComponentProps,
    AriaProps,
    BaseStyleProps,
    LinkOptions {}
