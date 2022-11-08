import { FieldValidator, InputEventType, ValidationMode } from '../../../types';

/*
 * `shouldValidate` determines whether validator should be run, based on validation mode,
 * input event type, and whether it has been blurred yet.
 */
export const shouldValidate = ({
  validationMode,
  eventType,
  hasBlurred,
}: {
  validationMode: ValidationMode;
  eventType: InputEventType;
  hasBlurred: boolean;
}) => {
  switch (validationMode) {
    case 'onBlur': {
      // only run validator on blur event
      return eventType === 'blur';
    }
    case 'onChange': {
      // only run validator on change event
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

// `runFieldValidator` runs all validators, and returns error messages.
export const runFieldValidators = ({
  value,
  validators,
  eventType,
  hasBlurred,
}: {
  value: string;
  validators: FieldValidator[];
  eventType: InputEventType;
  hasBlurred: boolean;
}): string[] => {
  if (!value) return [];

  const errors = [];

  validators?.forEach((validator) => {
    const { validate, validationMode } = validator;

    if (shouldValidate({ validationMode, eventType, hasBlurred })) {
      const hasError = !validate(value);
      if (hasError) {
        errors.push(validator.message);
      }
    }
  });

  return errors;
};
