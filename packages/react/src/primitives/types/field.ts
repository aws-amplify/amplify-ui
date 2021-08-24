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
   *  When defined and hasError is true, show error message
   */
  errorMessage?: string;

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
}

export type FieldVariations = 'quiet';
