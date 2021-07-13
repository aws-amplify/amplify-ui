import React from "react";

// Base component definition
export interface BaseComponentProps {
  id?: string;
  className?: string;

  /**
   * Any arbitrary props will be passed to the underlying element.
   */
  [key: string]: any;
}

export interface AriaProps {
  ariaLabel?: string;
}
