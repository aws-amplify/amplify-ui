import * as React from 'react';

import { FieldGroupIconButtonProps } from './fieldGroupIcon';
import { TextInputFieldProps } from './textField';
import { ViewProps } from './view';

type FilteringType = 'auto' | 'manual' | 'none';

export interface SearchFieldComboboxProps {
  role: React.AriaRole;
  'aria-activedescendant': React.AriaAttributes['aria-activedescendant'];
  'aria-autocomplete': React.AriaAttributes['aria-autocomplete'];
  'aria-controls': React.AriaAttributes['aria-controls'];
  'aria-expanded': React.AriaAttributes['aria-expanded'];
  'aria-haspopup': React.AriaAttributes['aria-haspopup'];
  'aria-owns': React.AriaAttributes['aria-owns'];
}

export interface Suggestion {
  /**
   * @description
   * Unique id for a suggestion
   */
  id: string;

  /**
   * @description
   * Label for a suggestion
   */
  label: string;

  [key: string]: string;
}

interface SuggestionMenu extends ViewProps {
  /**
   * @description
   * This is a slot to label a list of search suggestions
   */
  Header?: React.ReactNode;

  /**
   * @description
   * This is a slot to add any contextual information or actions to the suggestions
   * (e.g. an "X results" label or a "More suggestions" link)
   */
  Footer?: React.ReactNode;

  /**
   * @description
   * This is a slot to indicate the loading state when async request has been made to fetch suggestions
   */
  Loading?: React.ReactNode;

  /**
   * @description
   * This is a slot to indicate no matching suggestions found
   */
  Empty?: React.ReactNode;
}

export interface HighlightMatchProps extends ViewProps {
  children: string;

  query: string;
}

export interface SearchFieldSuggestionProps extends ViewProps {
  children: React.ReactNode;
}

export interface SearchFieldSuggestionMenuProps extends ViewProps {
  /**
   * @description
   * Active suggestion index
   */
  activeIdx: number;

  /**
   * @description
   * Active suggestion id
   */
  activeSuggestionId: string;

  /**
   * @description
   * Determines how filtering is applied to the list of suggestions.
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
   * Triggered when a suggestion is selected
   */
  onSuggestionSelect: (suggestion: Suggestion) => void;

  /**
   * @description
   * Used to customize the rendering of a suggestion inside the li element
   */
  renderSuggestion: (suggestion: Suggestion, value: string) => React.ReactNode;

  /**
   * @description
   * Set current active suggestion index
   */
  setActiveIdx: React.Dispatch<React.SetStateAction<number>>;

  /**
   * @description
   * Set the menu open state
   */
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * @description
   * Set text input value when it is uncontrolled
   */
  setInternalValue: React.Dispatch<React.SetStateAction<string>>;

  /**
   * @description
   * Base id use to construct id for each suggestion
   */
  suggestionBaseId: string;

  /**
   * @description
   * A list of suggestions
   */
  suggestions: Array<Suggestion>;

  /**
   * @description
   * A colleciton of slots to customize the dropdown of suggestions
   */
  suggestionMenu: SuggestionMenu;

  /**
   * @description
   * Current text input value
   */
  value: string;
}

export interface SearchFieldProps extends TextInputFieldProps {
  /**
   * @description
   * A list of suggestions
   */
  suggestions?: Array<Suggestion>;

  /**
   * @description
   * A colleciton of slots to customize the dropdown of suggestions
   */
  suggestionMenu?: SuggestionMenu;

  /**
   * @description
   * Used to indicate if the search field is in loading state
   * @default false
   */
  isLoading?: boolean;

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
   * Set the default value for an uncontrolled search field input
   */
  defaultValue?: string;

  /**
   * @description
   * Set the value for a controlled search field input
   */
  value?: string;

  // /**
  //  * @description
  //  * Used to customize the filtering of suggestions.
  //  * Default filter uses the input text to do substring matching against the suggestion `label`
  //  */
  // filterSuggestion?: (suggestion: Suggestion, value: string) => boolean;

  /**
   * @description
   * Determines how filtering is applied to the list of suggestions.
   *
   * 'auto' - The component will automatically filter suggestions based on text input
   *
   * 'manual' - User customizes filtering logic by setting up `onInput` event listener and update provided suggestions accordingly
   *
   * 'none' - Do not filter suggestions
   *
   * Note: Manual filtering will disable match highlighting.
   * @default 'auto'
   */
  filteringType?: FilteringType;

  /**
   * @description
   * Used to customize the rendering of a suggestion inside the li element
   */
  renderSuggestion?: (suggestion: Suggestion, value: string) => React.ReactNode;

  /**
   * @description
   * Triggered when search field is blur
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * @description
   * Triggered when search field is cleared
   */
  onClear?: () => void;

  /**
   * @description
   * Triggered when search field is clicked
   */
  onClick?: React.MouseEventHandler<HTMLInputElement>;

  /**
   * @description
   * Triggered when search field is clicked
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * @description
   * Triggered when input text changes
   */
  onInput?: React.FormEventHandler<HTMLInputElement>;

  /**
   * @description
   * Handle submission of search field input
   */
  onSubmit?: (value: string) => void;

  /**
   * @description
   * Triggered when a suggestion is selected
   */
  onSuggestionSelect?: (suggestion: Suggestion) => void;

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
