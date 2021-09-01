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

  /**
   * Any arbitrary props will be passed to the underlying element.
   */
  [key: string]: any;
}

export interface AriaProps {
  ariaLabel?: AriaAttributes['aria-label'];
  ariaCurrent?: AriaAttributes['aria-current'];
  ariaDisabled?: AriaAttributes['aria-disabled'];
  role?: React.AriaRole;
}
