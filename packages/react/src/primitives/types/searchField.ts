import * as React from 'react';

import { FieldGroupIconButtonProps } from './fieldGroupIcon';
import { TextFieldProps } from './textField';

export interface SearchFieldProps extends TextFieldProps {
  /**
   * @description
   * Set the initial value for an uncontrolled search field
   */
  defaultValue?: string;

  /**
   * @description
   * Set the value for a controlled search field
   */
  value?: string;

  /**
   * @description
   * Used to determine whether to render a search button on the right
   * @default true
   */
  hasSearchButton?: boolean;

  /**
   * @description
   * Used to determine whether to render a search icon on the left when there is no search button
   * @default false
   */
  hasSearchIcon?: boolean;

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

export interface UseSearchFieldProps extends Partial<SearchFieldProps> {
  externalRef?: React.ForwardedRef<HTMLInputElement>;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
