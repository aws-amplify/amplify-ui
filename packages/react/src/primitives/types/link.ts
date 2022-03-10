import * as React from 'react';
import { ViewProps } from './view';

export interface LinkOptions {
  /**
   * Children to be rendered inside the Link component
   */
  children: React.ReactNode;

  /**
   * Boolean value indicating an external link
   * sets the rel attribute to "noopener noreferrer"
   */
  isExternal?: boolean;

  /**
   * A string representation of the URL path
   */
  to?: string;
}

export interface LinkProps extends ViewProps, LinkOptions {}
