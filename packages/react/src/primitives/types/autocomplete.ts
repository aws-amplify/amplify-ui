import * as React from 'react';

import { SearchFieldProps } from './searchField';
import { ViewProps } from './view';

type FilteringType = 'auto' | 'manual' | 'none';

export interface AutocompleteComboboxProps {
  role: React.AriaRole;
  'aria-activedescendant': React.AriaAttributes['aria-activedescendant'];
  'aria-autocomplete': React.AriaAttributes['aria-autocomplete'];
  'aria-controls': React.AriaAttributes['aria-controls'];
  'aria-expanded': React.AriaAttributes['aria-expanded'];
  'aria-haspopup': React.AriaAttributes['aria-haspopup'];
  'aria-owns': React.AriaAttributes['aria-owns'];
}

export interface Option {
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

interface OptionMenu {
  /**
   * @description
   * Defines a string value that labels an interactive element for accessibility
   */
  ariaLabel?: React.AriaAttributes['aria-label'];

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
  Loading?: React.ReactNode;

  /**
   * @description
   * This is a slot to indicate no matching options found
   */
  Empty?: React.ReactNode;
}

export interface HighlightMatchProps extends ViewProps {
  /**
   * @description
   * The label you would like to have match highlighting
   */
  children: string;

  /**
   * @description
   * A query string used to match against the label
   */
  query: string;
}

export interface AutocompleteOptionProps extends ViewProps {
  /**
   * React node that will be wrapped inside a li element
   */
  children: React.ReactNode;
}

export interface AutocompleteMenuProps extends ViewProps {
  /**
   * @description
   * Active option index
   */
  activeIdx: number;

  /**
   * @description
   * Active option id
   */
  activeOptionId: string;

  /**
   * @description
   * Determines how filtering is applied to the list of options.
   *
   * Note: Manual filtering will disable match highlighting.
   * @default 'auto'
   */
  filteringType: FilteringType;

  /**
   * @description
   * Used to indicate if it is controlled component
   * @default false
   */
  isControlled: boolean;

  /**
   * @description
   * Used to indicate if the menu is in loading state
   * @default false
   */
  isLoading: boolean;

  /**
   * @description
   * Used to indicate if the menu is open
   * @default false
   */
  isOpen: boolean;

  /**
   * @description
   * Listbox id
   */
  listboxId: string;

  /**
   * @description
   * Triggered when an option is selected
   */
  onSelect: (option: Option) => void;

  /**
   * @description
   * Used to customize the rendering of an option inside the li element
   */
  renderOption: (option: Option, value: string) => React.ReactNode;

  /**
   * @description
   * Set current active option index
   */
  setActiveIdx: React.Dispatch<React.SetStateAction<number>>;

  /**
   * @description
   * Set the menu open state
   */
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * @description
   * Set text input value when it is uncontrolled
   */
  setValue: React.Dispatch<React.SetStateAction<string>>;

  /**
   * @description
   * Base id use to construct id for each option
   */
  optionBaseId: string;

  /**
   * @description
   * A list of options
   */
  options: Array<Option>;

  /**
   * @description
   * A colleciton of slots to customize the dropdown of options
   */
  menu: OptionMenu;

  /**
   * @description
   * Current text input value
   */
  value: string;
}

export interface AutocompleteProps extends SearchFieldProps {
  /**
   * @description
   * A list of options
   */
  options: Array<Option>;

  /**
   * @description
   * A colleciton of slots to customize the dropdown of options
   */
  menu?: OptionMenu;

  /**
   * @description
   * Used to indicate if the autocomplete in loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * @description
   * Determines how filtering is applied to the list of options.
   *
   * 'auto' - The component will automatically filter options based on text input
   *
   * 'manual' - User customizes filtering logic by setting up `onInput` event listener and update provided options accordingly
   *
   * 'none' - Do not filter options
   *
   * Note: Manual filtering will disable match highlighting.
   * @default 'auto'
   */
  filteringType?: FilteringType;

  /**
   * @description
   * Used to customize the rendering of an option inside the li element
   */
  renderOption?: (option: Option, value: string) => React.ReactNode;

  /**
   * @description
   * Triggered when an option is selected
   */
  onSelect?: (option: Option) => void;
}

export interface UseAutocompleteProps extends Partial<AutocompleteProps> {
  onBlur: React.FocusEventHandler<HTMLInputElement>;

  onChange: React.ChangeEventHandler<HTMLInputElement>;

  onClick: React.MouseEventHandler<HTMLInputElement>;

  onFocus: React.FocusEventHandler<HTMLInputElement>;
}
