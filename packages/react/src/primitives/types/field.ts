import { FieldGroupIconButtonProps } from './fieldGroupIcon';
import { InputProps } from './input';
import { TextProps } from './text';

/**
 * Shared type across all field types
 */
export interface FieldProps {
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
}

export interface FieldClearButtonProps
  extends Partial<FieldGroupIconButtonProps> {}
export interface FieldDescriptionProps
  extends TextProps,
    Pick<FieldProps, 'descriptiveText' | 'labelHidden'> {}
export interface FieldErrorMessageProps
  extends TextProps,
    Pick<FieldProps, 'errorMessage'>,
    Pick<InputProps, 'hasError'> {}

export type FieldVariations = 'quiet';

export type LabelPositions = 'start' | 'end' | 'top' | 'bottom';
