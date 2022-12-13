export type InputEventType = 'blur' | 'change';

export type ValidationMode = 'onBlur' | 'onChange' | 'onTouched';

export interface ValidatorOptions {
  validationMode: ValidationMode;
  validator: (value: string) => boolean;
  message: string;
}

export interface PasswordRequirement {
  minLength?: number;
  needsLowerCase?: boolean;
  needsUpperCase?: boolean;
  needsSpecialChar?: boolean;
  needsNumber?: boolean;
}
