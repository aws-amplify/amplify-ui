import { FieldValidator, InputEventType, ValidationMode } from '../../../types';

/**
 * `shouldValidate` determines whether validator should be run, based on validation mode,
 * input event type, and whether it has been blurred yet.
 */
export const shouldValidate = (
  validationMode: ValidationMode,
  eventType: InputEventType,
  hasBlurred: boolean
) => {
  switch (validationMode) {
    case 'onBlur': {
      // only run validator on blur event
      return eventType === 'blur';
    }
    case 'onChange': {
      // only run validtor on change event
      return eventType === 'change';
    }
    case 'onTouched': {
      /**
       * run validator on first blur event, and then every subsequent
       * blur/change event.
       */
      return eventType === 'blur' || hasBlurred;
    }
  }
};

/**
 * `runFieldValidator` runs all validators, and returns error messages.
 */
export const runFieldValidators = (
  field: string,
  validators: FieldValidator[],
  eventType: InputEventType,
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
