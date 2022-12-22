import * as React from 'react';

import { SearchFieldProps } from './searchField';
import { ViewProps } from './view';

export interface AutocompleteComboboxProps {
  role: React.AriaRole;
  'aria-activedescendant': React.AriaAttributes['aria-activedescendant'];
  'aria-autocomplete': React.AriaAttributes['aria-autocomplete'];
  'aria-controls': React.AriaAttributes['aria-controls'];
  'aria-expanded': React.AriaAttributes['aria-expanded'];
  'aria-haspopup': React.AriaAttributes['aria-haspopup'];
  'aria-owns': React.AriaAttributes['aria-owns'];
}

export interface ComboBoxOption {
  /**
   * @description
   * Unique id for an option
   */
  id: string;

  /**
   * @description
   * Label for an option
   */
  label: string;

  [key: string]: string;
}

export interface AutocompleteOptionProps extends ViewProps {
  /**
   * React node that will be wrapped inside a li element
   */
  children: React.ReactNode;
  /**
   * @description
   * Determine if it is an active option
   */
  isActive: boolean;
}

export interface AutocompleteMenuProps extends ViewProps {
  /**
   * @description
   * Defines a string value that labels an interactive element for accessibility
   */
  ariaLabel?: React.AriaAttributes['aria-label'];

  /**
   * @description
   * A list of Option JSX elements
   */
  children: JSX.Element[];

  /**
   * @description
   * This is a slot to label a list of options
   */
  Header?: React.ReactNode;

  /**
   * @description
   * This is a slot to add any contextual information or actions to the options
   * (e.g. an "X results" label or a "More options" link)
   */
  Footer?: React.ReactNode;

  /**
   * @description
   * This is a slot to indicate the loading state when async request has been made to fetch options
   */
  LoadingIndicator?: React.ReactNode;

  /**
   * @description
   * This is a slot to indicate no matching options found
   */
  Empty?: React.ReactNode;

  /**
   * @description
   * Used to indicate if the menu is in loading state
   * @default false
   */
  isLoading: boolean;

  /**
   * @description
   * Listbox id
   */
  listboxId: string;
}

export interface AutocompleteProps extends SearchFieldProps {
  /**
   * @description
   * A list of options
   */
  options: Array<ComboBoxOption>;

  /**
   * @description
   * A colleciton of slots to customize the dropdown of options
   */
  menuSlots?: Pick<
    AutocompleteMenuProps,
    'ariaLabel' | 'Header' | 'Footer' | 'Empty' | 'LoadingIndicator'
  >;

  /**
   * @description
   * Used to indicate if the autocomplete in loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * @description
   * Custom filter that will be applied to options.
   *
   * Note: Applying custom filter to options will disable match highlighting.
   */
  optionFilter?: (option: ComboBoxOption, value: string) => boolean;

  /**
   * @description
   * Used to customize the rendering of an option inside the li element
   */
  renderOption?: (option: ComboBoxOption, value: string) => React.ReactNode;

  /**
   * @description
   * Triggered when an option is selected
   */
  onSelect?: (option: ComboBoxOption) => void;
}

export interface UseAutocompleteProps extends Partial<AutocompleteProps> {
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  onClick?: React.MouseEventHandler<HTMLInputElement>;
}
