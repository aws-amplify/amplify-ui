export type FieldValidatorHandler = (field: string) => boolean;

export type FormEventType = 'blur' | 'change';

export interface FieldValidator {
  event: 'onBlur' | 'onChange' | 'onTouched';
  handler: (field: string) => boolean;
  message: string;
}
