import { Property } from 'csstype';

import { Sizes } from './base';
import { FieldVariations } from './field';
import { ViewProps } from './view';

export interface TextAreaStyleProps {
  resize?: Property.Resize;
}

export interface TextAreaProps extends TextAreaStyleProps, ViewProps {
  /**
   * Specifies permissions for browser UA to autocomplete field
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  autoComplete?: string;

  /**
   * Use this to provide a default value for an uncontrolled field
   */
  defaultValue?: React.HTMLAttributes<'textarea'>['defaultValue'];

  /**
   * Indicates that Field is in error state
   */
  hasError?: boolean;

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
   * Text contents maximum length
   */
  maxLength?: number;

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
   * Controls height based on number of rows of text to display
   */
  rows?: number;

  /**
   * Changes the font-size, padding, and height of the field.
   */
  size?: Sizes;

  /**
   * If value is provided, this will be a controlled field
   */
  value?: React.HTMLAttributes<'textarea'>['defaultValue'];

  /**
   * Variants
   */
  variation?: FieldVariations;
}
