import { FormValues, ValidationError } from '../types';

export const getIsDisabled = (
  formValues: FormValues,
  validationError: ValidationError
): boolean => {
  const { newPassword, confirmPassword } = formValues;

  if (!newPassword || !confirmPassword) {
    // if passwords aren't entered yet, disable submit
    return true;
  } else if (
    // if there are some password validation error, disable submit
    validationError.newPassword?.length > 0 ||
    validationError.confirmPassword?.length > 0
  ) {
    return true;
  }

  return false;
};
