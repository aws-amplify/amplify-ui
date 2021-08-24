import React from 'react';
import { BaseComponentProps, AriaProps, Sizes } from './base';
import { FieldVariations } from './field';
import { BaseStyleProps } from './style';

export type InputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

export interface InputProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  /**
   * Specifies permissions for browser UA to autocomplete field
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  autoComplete?: string;

  /**
   * Use this to provide a default value for an uncontrolled field
   */
  defaultValue?: string | number | readonly string[];

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
   * Input change event handler
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   *
   */
  onInput?: React.FormEventHandler<HTMLInputElement>;

  /**
   *
   */
  onBeforeInput?: React.FormEventHandler<HTMLInputElement>;

  /**
   * Copy clipboard event
   */
  onCopy?: React.ClipboardEventHandler<HTMLInputElement>;

  /**
   * Cut clipboard event
   */
  onCut?: React.ClipboardEventHandler<HTMLInputElement>;

  /**
   * Paste clipboard event
   */
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;

  /**
   * Selection event
   */
  onSelect?: React.FormEventHandler<HTMLInputElement>;

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
  visualSize?: Sizes;

  /**
   * Input type
   * @default "text"
   */
  type?: string;

  /**
   * If value is provided, this will be a controlled field
   */
  value?: string | number | readonly string[];

  /**
   * Variants
   */
  variations?: FieldVariations;
}
