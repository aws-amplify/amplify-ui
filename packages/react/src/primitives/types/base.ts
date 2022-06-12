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
   * Additional CSS class name for component
   */
  className?: string;

  /**
   * @description
   * Used to provide a `data-testid` attribute for testing purposes
   */
  testId?: string;
}

export interface AriaProps {
  ariaLabel?: AriaAttributes['aria-label'];
  role?: React.AriaRole;
}

export type Sizes = 'small' | 'large';
