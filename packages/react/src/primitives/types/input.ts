import * as React from 'react';
import { Sizes } from './base';
import { FieldVariations } from './field';
import { ViewProps } from './view';

export type InputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

export type InputSizes = Sizes;

export interface InputProps extends ViewProps {
  /**
   * Specifies permissions for browser UA to autocomplete field
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  autoComplete?: string;

  /**
   * If checked is provided, this will be a controlled checkbox or radio
   */
  checked?: boolean;

  /**
   * Use this to initialize an uncontrolled checkbox or radio
   */
  defaultChecked?: boolean;

  /**
   * Use this to provide a default value for an uncontrolled field
   */
  defaultValue?: React.AllHTMLAttributes<'input'>['defaultValue'];

  /**
   * Indicates that Field is in error state
   */
  hasError?: boolean;

  /**
   * Provides hint for virtual keyboard shown
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
   * @default: "text"
   */
  inputMode?: InputMode;

  /**
   *  Determines whether field should be disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Determines whether field should be immutable
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-readonly
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * Whether field should be marked required
   */
  isRequired?: boolean;

  /**
   * Name of the field. Submitted with the form as part of a name/value pair.
   */
  name?: string;

  /**
   * Placeholder text shown when field is empty
   * Accessibility tip: avoid putting important instructions for
   * filling out the TextField in the placeholder. Use descriptiveText
   * for important instructions
   */
  placeholder?: string;

  /**
   * Changes the font-size, padding, and height of the field.
   */
  size?: InputSizes;

  /**
   * Input field type
   */
  type?: React.HTMLInputTypeAttribute;

  /**
   * If value is provided, this will be a controlled field
   */
  value?: React.AllHTMLAttributes<'input'>['value'];

  /**
   * Variants
   */
  variation?: FieldVariations;
}
