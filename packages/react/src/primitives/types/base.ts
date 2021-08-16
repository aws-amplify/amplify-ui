import * as React from 'react';

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
  ariaLabel?: React.AriaAttributes['aria-label'];
  ariaCurrent?: React.AriaAttributes['aria-current'];
  ariaDisabled?: React.AriaAttributes['aria-disabled'];
}
