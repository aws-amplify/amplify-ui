import { FieldGroupIconButtonProps } from './fieldGroupIcon';
import { InputProps } from './input';
import { BaseStyleProps } from './style';

/**
 * Shared type across all field types
 */
export interface FieldProps {
  /**
   * Provides additional information needed to fill field
   * (e.g. password requirements, etc.)
   */
  descriptiveText?: React.ReactNode;

  /**
   *  When defined and `hasError` is true, show error message
   */
  errorMessage?: string;

  /**
   * Label text for field (required)
   */
  label: React.ReactNode;

  /**
   * Visually hide label (not recommended in most cases)
   * @default false
   */
  labelHidden?: boolean;

  inputStyles?: BaseStyleProps;
}

export interface FieldClearButtonProps
  extends Partial<FieldGroupIconButtonProps> {}
export interface FieldDescriptionProps
  extends Pick<FieldProps, 'descriptiveText' | 'labelHidden'> {}
export interface FieldErrorMessageProps
  extends Pick<FieldProps, 'errorMessage'>,
    Pick<InputProps, 'hasError'> {}

export type FieldVariations = 'quiet';
