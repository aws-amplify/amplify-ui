import * as React from 'react';

import { BaseSearchFieldProps } from './searchField';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';

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
  [key: string]: string;

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
}

/** @deprecated For internal use only */
export interface BaseAutocompleteOptionProps extends BaseViewProps {
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
export type AutocompleteOptionProps<Element extends ElementType = 'li'> =
  PrimitiveProps<BaseAutocompleteOptionProps, Element>;

/** @deprecated For internal use only */
export interface BaseAutocompleteMenuProps extends BaseViewProps {
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
export type AutocompleteMenuProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseAutocompleteMenuProps, Element>;

/** @deprecated For internal use only */
export interface BaseAutocompleteProps extends BaseSearchFieldProps {
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

export type AutocompleteProps<Element extends ElementType = 'input'> =
  PrimitiveProps<BaseAutocompleteProps, Element>;

export interface UseAutocompleteProps extends Partial<AutocompleteProps> {
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

export interface UseAutocomplete {
  activeOptionId?: ComboBoxOption['id'];
  autocompleteId: string;
  composedValue: string;
  filteredOptions: ComboBoxOption[];
  handleOnBlur: React.FocusEventHandler<HTMLInputElement>;
  handleOnClear: () => void;
  handleOnClick: React.MouseEventHandler<HTMLInputElement>;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
  handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  isControlled: boolean;
  isCustomFiltering: boolean;
  isMenuOpen: boolean;
  listboxId: string;
  menuId: string;
  optionBaseId: string;
  setActiveOption: SetStateAction<ComboBoxOption | null>;
  setIsMenuOpen: SetStateAction<boolean>;
  setInternalValue: SetStateAction<string>;
}
