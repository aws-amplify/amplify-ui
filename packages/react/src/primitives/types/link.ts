import React from 'react';
import { BaseComponentProps, AriaProps } from './base';
import { BaseStyleProps } from './style';

export interface LinkProps
  extends BaseComponentProps,
    AriaProps,
    BaseStyleProps {
  /**
   * Boolean value indicating an external link
   * sets the rel attribute to "noopener noreferrer"
   */
  isExternal?: boolean;

  /**
   * React component to use instead of an anchor tag
   * This is used for react routing libraries that have routing components
   */
  as?: React.FC;

  /**
   * Children to be rendered inside the Link component
   */
  children: React.ReactNode;
}
