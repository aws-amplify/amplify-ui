import { AriaProps, BaseComponentProps, Sizes } from './base';
import { BaseStyleProps } from './style';
import { FlexStyleProps } from './flex';

export type TextFieldType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url';

export type InputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

export interface TextFieldProps
  extends BaseComponentProps,
    BaseStyleProps,
    FlexStyleProps,
    AriaProps {
  /**
   * Specifies permissions for browser UA to autocomplete field
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  autoComplete?: string;

  /**
   *  Determines whether input should be disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Determines whether input should be immutable
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-readonly
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * Whether field should be marked required
   */
  isRequired?: boolean;

  /**
   * Label text for field (required)
   */
  label: React.ReactNode;

  /**
   * Hide label and use `aria-label` attribute instead. Common use case
   * is a search field.
   * @default false
   */
  labelHidden?: boolean;

  /**
   * Name of the form control. Submitted with the form as part of a name/value pair.
   */
  name?: string;

  /**
   * Indicates that TextField is in error state
   */
  hasError?: boolean;

  /**
   *  When defined and hasError is true, show error message
   */
  errorMessage?: string;

  // /**
  //  * Input change event handler
  //  */
  // onChange?: React.ChangeEventHandler<HTMLInputElement>;

  // /**
  //  * Input blur event handler
  //  */
  // onBlur?: React.ChangeEventHandler<HTMLInputElement>;

  // /**
  //  * Input focus event handler
  //  */
  // onFocus?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * Placeholder text shown when field is empty
   * Accessibility tip: avoid putting important instructions for
   * filling out the TextField in the placeholder. Use descriptiveText
   * for important instructions
   */
  placeholder?: string;

  /**
   * Provides additional information needed to fill TextField
   * (e.g. password requirements, etc.)
   */
  descriptiveText?: React.ReactNode;

  /**
   * Changes the font-size, padding, and height of the input.
   * @default "medium"
   */
  size?: Sizes;

  /**
   * Input type
   * @default "text"
   */
  type?: TextFieldType;

  /**
   * Provides hint for virtual keyboard shown
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
   * @default: "text"
   */
  inputMode?: InputMode;

  /**
   * Use this to provide a default value for an uncontrolled TextField
   */
  defaultValue?: string;

  /**
   * If value is provided, this will be a controlled TextField
   */
  value?: string;
}
