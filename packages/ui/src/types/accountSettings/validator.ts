export type InputEventType = 'blur' | 'change';

export type ValidationMode = 'onBlur' | 'onChange' | 'onTouched';

export interface FieldValidator {
  validationMode: ValidationMode;
  validate: (field: string) => boolean;
  message: string;
}

export interface PasswordRequirement {
  minLength?: number;
  needsLowerCase?: boolean;
  needsUpperCase?: boolean;
  needsSpecialChar?: boolean;
  needsNumber?: boolean;
}
