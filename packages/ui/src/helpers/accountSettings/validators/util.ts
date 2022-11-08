import { FieldValidator, ValidationMode } from '../../../types';

export const shouldValidate = (
  validationMode: ValidationMode,
  eventType: 'change' | 'blur',
  hasBlurred: boolean
) => {
  switch (validationMode) {
    case 'onBlur': {
      return eventType === 'blur';
    }
    case 'onChange': {
      return eventType === 'change';
    }
    case 'onTouched': {
      return eventType === 'blur' || hasBlurred;
    }
  }
};

export const runFieldValidators = (
  field: string,
  validators: FieldValidator[],
  eventType: 'change' | 'blur',
  hasBlurred: boolean
): string[] => {
  if (!field) return [];

  const errors = [];

  validators?.forEach((validator) => {
    const { validate, validationMode } = validator;

    if (shouldValidate(validationMode, eventType, hasBlurred)) {
      const hasError = !validate(field);
      if (hasError) {
        errors.push(validator.message);
      }
    }
  });

  return errors;
};
