import * as React from 'react';

import { FieldGroupIconButtonProps } from './fieldGroupIcon';
import { TextInputFieldProps } from './textField';

interface Suggestion {
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

interface SuggestionsMenu {
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
  suggestionsMenu?: SuggestionsMenu;

  /**
   * @description
   * Used to indicate the search field is in loading state
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
   * @default true
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

  /**
   * @description
   * Used to customize the rendering of a suggestion inside the li element
   */
  renderSuggestion?: (suggestion: Suggestion, value: string) => React.ReactNode;

  /**
   * @description
   * Used to customize the filtering of suggestions.
   * Default filter uses the input text to do substring matching against the suggestion `label`
   */
  filterSuggestion?: (suggestion: Suggestion, value: string) => boolean;

  /**
   * @description
   * Triggered when a suggestion is selected
   */
  onSuggestionSelect?: (suggestion: Suggestion) => void;

  /**
   * @description
   * Triggered when input text changes
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

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
