import * as React from 'react';

import { FlexProps } from './flex';
import { ToggleButtonProps } from './toggleButton';

export interface ToggleButtonGroupProps
  extends FlexProps,
    Pick<ToggleButtonProps, 'size' | 'variation'> {
  /**
   * Accepts any number of ToggleButton components
   */
  children: React.ReactNode;

  /**
   * When `true`, only allows one ToggleButton to be pressed at a time within a ToggleButtonGroup
   */
  isExclusive?: boolean;

  /**
   * Used when at least one ToggleButton needs to be currently pressed
   */
  isSelectionRequired?: boolean;

  /**
   * Controls which of its ToggleButton children are currently selected
   */
  value: string | string[];

  /**
   * Handles changes to the current value when using the ToggleButtonGroup as a controlled component
   */
  onChange: (value: string | string[]) => void;
}
