import { FormControl, ValidatorFn } from '@angular/forms';

/**
 * Custom Form Validators
 */
export const noWhitespaces: ValidatorFn = (control: FormControl) => {
  if (!control || !control.value) return null;

  const value = control.value;
  const containsWhitespace = value.replace(/\s/g, '').length !== value.length;
  return containsWhitespace ? { whitespace: true } : null;
};

export const noWhitespacesAfterTrim: ValidatorFn = (control: FormControl) => {
  if (!control || !control.value) return null;

  const value = control.value.trim();
  const containsWhitespace = value.replace(/\s/g, '').length !== value.length;
  return containsWhitespace ? { whitespace: true } : null;
};
