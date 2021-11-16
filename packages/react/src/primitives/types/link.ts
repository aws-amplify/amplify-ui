import * as React from 'react';
import { ViewProps } from './view';

export interface LinkOptions {
  /**
   * Boolean value indicating an external link
   * sets the rel attribute to "noopener noreferrer"
   */
  isExternal?: boolean;

  /**
   * Children to be rendered inside the Link component
   */
  children: React.ReactNode;
}

export interface LinkProps extends ViewProps, LinkOptions {}
