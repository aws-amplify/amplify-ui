import React, { AriaAttributes } from 'react';

// Base component definition
export interface BaseComponentProps {
  /**
   * Unique identifier
   */
  id?: string;

  /**
   * Additional CSS class name for component
   */
  className?: string;

  /**
   * Used to provide a `data-testid` attribute for testing purposes
   */
  testId?: string;
}

export interface AriaProps {
  ariaLabel?: AriaAttributes['aria-label'];
  ariaValueText?: AriaAttributes['aria-valuetext'];
  role?: React.AriaRole;
}

export type Sizes = 'small' | 'large';
