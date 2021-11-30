import React from 'react';
import { FieldGroupIconButtonProps } from './fieldGroupIcon';
import { TextInputFieldProps } from './textField';

export interface SearchFieldProps extends TextInputFieldProps {
  /**
   * Handle submission of search field input
   */
  onSubmit?: (value: string) => void;

  /**
   * Triggered when search field is cleared
   */
  onClear?: () => void;

  /**
   * Visually hide label
   * @default true
   */
  labelHidden?: boolean;

  /**
   * Provides ref access to search button DOM element
   */
  searchButtonRef?: React.Ref<HTMLButtonElement>;
}

export interface SearchFieldButtonProps
  extends Partial<FieldGroupIconButtonProps> {}
