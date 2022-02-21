import * as React from 'react';

import { FieldGroupIconButtonProps } from './fieldGroupIcon';
import { TextFieldProps } from './textField';

export interface SearchFieldProps extends TextFieldProps {
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

export type UseSearchFieldProps = Partial<SearchFieldProps> & {
  externalRef?: React.ForwardedRef<HTMLInputElement>;
};
