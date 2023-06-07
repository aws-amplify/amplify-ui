import * as React from 'react';
import { Sizes } from './base';
import { FieldVariations } from './field';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';

export type EnterKeyHint =
  | 'enter'
  | 'done'
  | 'go'
  | 'next'
  | 'previous'
  | 'search'
  | 'send';

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

export interface BaseInputProps extends BaseViewProps {
  /**
   * @description
   * Specifies permissions for browser UA to autocomplete field.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   */
  autoComplete?: string;

  /**
   * @description
   * If checked is provided, this will be a controlled checkbox or radio.
   */
  checked?: boolean;

  /**
   * @description
   * Use this to initialize an uncontrolled checkbox or radio.
   */
  defaultChecked?: boolean;

  /**
   * @description
   * Use this to provide a default value for an uncontrolled field.
   */
  defaultValue?: React.AllHTMLAttributes<'input'>['defaultValue'];

  /**
   * @description
   * Indicates that Field is in error state.
   */
  hasError?: boolean;

  /**
   * @description
   * Defines what action label (or icon) to present for the enter key on virtual keyboards.
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint)
   */
  enterKeyHint?: EnterKeyHint;

  /**
   * @description
   *  Provides hint for virtual keyboard shown
   * @see
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)
   * @default "text"
   */
  inputMode?: InputMode;

  /**
   * @description
   *  Determines whether field should be disabled.
   * @default
   * false
   */
  isDisabled?: boolean;

  /**
   * @description
   * Determines whether field should be immutable.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-readonly)
   * @default
   * false
   */
  isReadOnly?: boolean;

  /**
   * @description
   * Whether field should be marked required.
   */
  isRequired?: boolean;

  /**
   * @description
   * Name of the field. Submitted with the form as part of a name/value pair.
   */
  name?: string;

  /**
   * @description
   * Placeholder text shown when field is empty Accessibility tip: avoid putting important instructions for filling out the TextField in the placeholder. Use descriptiveText for important instructions.
   */
  placeholder?: string;

  /**
   * @description
   * Changes the font-size, padding, and height of the field.
   */
  size?: InputSizes;

  /**
   * @description
   * Input field type.
   */
  type?: React.HTMLInputTypeAttribute;

  /**
   * @description
   * If value is provided, this will be a controlled field.
   */
  value?: React.AllHTMLAttributes<'input'>['value'];

  /**
   * @description
   * Variants.
   */
  variation?: FieldVariations;
}

export type InputProps<Element extends ElementType = 'input'> = PrimitiveProps<
  BaseInputProps,
  Element
>;
