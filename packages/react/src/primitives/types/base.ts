import React, { AriaAttributes } from 'react';

// Base component definition
export interface BaseComponentProps {
  /**
   * @description
   * Unique identifier
   */
  id?: string;

  /**
   * @description
   * Children to be rendered inside the component
   */
  children?: React.ReactNode;

  /**
   * @description
   * Additional CSS class name for component
   */
  className?: string;

  /**
   * @description
   * Used to provide a `data-testid` attribute for testing purposes
   */
  testId?: string;

  /**
   * @description
   * Support for the HTML `inert` attribute
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert
   */
  inert?: boolean;
}

export interface AriaProps {
  /**
   * @description
   * Defines a string value that labels an interactive element for accessibility
   */
  ariaLabel?: AriaAttributes['aria-label'];

  /**
   * @description
   * Defines the human readable text alternative of `aria-valuenow` for a range widget
   */
  ariaValuetext?: AriaAttributes['aria-valuetext'];

  /**
   * @description
   * Provides semantic meaning to content, allowing screen readers to support interaction in a way that is consistent with user expectations
   */
  role?: React.AriaRole;
}

export type Sizes = 'small' | 'large';
