import * as React from 'react';

import { FieldGroupIconButtonProps } from './fieldGroupIcon';
import { TextFieldProps } from './textField';

export interface SearchFieldProps extends TextFieldProps {
  /**
   * @description
   * Handle submission of search field input
   */
  onSubmit?: (value: string) => void;

  /**
   * @description
   * Triggered when search field is cleared
   */
  onClear?: () => void;

  /**
   * @description
   * Visually hide label
   * @default
   * true
   */
  labelHidden?: boolean;

  /**
   * @description
   * Set the `aria-label` for clear button
   * @default
   * "Clear search"
   */
  clearButtonLabel?: string;

  /**
   * @description
   * Provides ref access to search button DOM element
   */
  searchButtonRef?: React.Ref<HTMLButtonElement>;
}

export interface SearchFieldButtonProps
  extends Partial<FieldGroupIconButtonProps> {}

export type UseSearchFieldProps = Partial<SearchFieldProps> & {
  externalRef?: React.ForwardedRef<HTMLInputElement>;
};
