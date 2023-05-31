import { BaseFieldGroupIconButtonProps } from './fieldGroupIcon';
import { BaseInputProps } from './input';
import { BaseTextProps } from './text';
import { BaseStyleProps } from './style';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';

/**
 * Shared type across all field types
 */
export interface BaseFieldProps extends BaseViewProps {
  /**
   * @description
   * Provides additional information needed to fill field
   * (e.g. password requirements, etc.)
   */
  descriptiveText?: React.ReactNode;

  /**
   * @description
   *  When defined and `hasError` is true, show error message
   */
  errorMessage?: string;

  /**
   * @description
   * Label text for field (required)
   */
  label: React.ReactNode;

  /**
   * @description
   * Visually hide label (not recommended in most cases)
   * @default
   * false
   */
  labelHidden?: boolean;

  /**
   * @description
   * Style props to be applied to the input element
   */
  // Note: this is using BaseStyleProps rather than AllStyleProps because
  // not all style props are valid on all input elements like input, textarea, and select.
  inputStyles?: BaseStyleProps;
}

export type FieldProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseFieldProps,
  Element
>;

export interface BaseFieldClearButtonProps
  extends Partial<BaseFieldGroupIconButtonProps> {}
export type FieldClearButtonProps<Element extends ElementType = 'button'> =
  PrimitiveProps<BaseFieldClearButtonProps, Element>;

export interface BaseFieldDescriptionProps
  extends BaseTextProps,
    Pick<BaseFieldProps, 'descriptiveText' | 'labelHidden'> {}
export type FieldDescriptionProps<Element extends ElementType = 'p'> =
  PrimitiveProps<BaseFieldDescriptionProps, Element>;

export interface BaseFieldErrorMessageProps
  extends BaseTextProps,
    Pick<BaseFieldProps, 'errorMessage'>,
    Pick<BaseInputProps, 'hasError'> {}
export type FieldErrorMessageProps<Element extends ElementType = 'p'> =
  PrimitiveProps<BaseFieldErrorMessageProps, Element>;

export type FieldVariations = 'quiet';

export type LabelPositions = 'start' | 'end' | 'top' | 'bottom';
